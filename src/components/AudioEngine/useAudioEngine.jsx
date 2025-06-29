import { useEffect, useRef } from 'react';

export function useAudioEngine({
  isPlaying,
  frequency,
  binauralOffset,
  isBinaural,
  volume,
  modulationEnabled,
  modulationType,
  modulationRate,
}) {
  const audioContextRef = useRef(null);
  const gainRef = useRef(null);
  const leftOscRef = useRef(null);
  const rightOscRef = useRef(null);
  const filterRef = useRef(null);
  const mergerRef = useRef(null);
  const lfoRef = useRef(null);
  const lfoGainRef = useRef(null);
  const offsetRef = useRef(null);

  // Init AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  // Start/stop base audio
  useEffect(() => {
    if (isPlaying) startAudio();
    else stopAudio();
  }, [isPlaying]);

  // Apply modulation dynamically
  useEffect(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !isPlaying) return;

    lfoRef.current?.frequency.setValueAtTime(modulationRate, ctx.currentTime);

    if (modulationType === 'am' && offsetRef.current && lfoGainRef.current) {
      const modulationDepth = 0.5;
      offsetRef.current.offset.setValueAtTime(
        volume - modulationDepth / 2,
        ctx.currentTime
      );
      lfoGainRef.current.gain.setValueAtTime(
        modulationDepth / 2,
        ctx.currentTime
      );
    }

    if (modulationType === 'fm' && lfoGainRef.current) {
      const fmDepth = 20;
      lfoGainRef.current.gain.setValueAtTime(fmDepth, ctx.currentTime);
    }

    if (gainRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        volume,
        ctx.currentTime + 0.2
      );
    }

    if (leftOscRef.current && rightOscRef.current) {
      leftOscRef.current.frequency.linearRampToValueAtTime(
        frequency,
        ctx.currentTime + 0.2
      );
      const rightFreq = isBinaural ? frequency + binauralOffset : frequency;
      rightOscRef.current.frequency.linearRampToValueAtTime(
        rightFreq,
        ctx.currentTime + 0.2
      );
    }
  }, [
    modulationRate,
    modulationType,
    volume,
    frequency,
    binauralOffset,
    isBinaural,
    isPlaying,
  ]);

  // Switch modulation type live
  useEffect(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !isPlaying || !modulationEnabled) return;

    cleanupModulation();

    applyModulation(
      ctx,
      gainRef.current,
      leftOscRef.current,
      rightOscRef.current
    );
  }, [modulationType]);

  // ✅ Désactiver modulation proprement
  useEffect(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !isPlaying) return;

    if (!modulationEnabled) {
      cleanupModulation();

      // Revenir au son pur
      if (leftOscRef.current && rightOscRef.current) {
        leftOscRef.current.frequency.setValueAtTime(frequency, ctx.currentTime);
        const rightFreq = isBinaural ? frequency + binauralOffset : frequency;
        rightOscRef.current.frequency.setValueAtTime(
          rightFreq,
          ctx.currentTime
        );
      }

      if (gainRef.current) {
        gainRef.current.gain.setValueAtTime(volume, ctx.currentTime);
      }
    }
  }, [modulationEnabled]);

  const cleanupModulation = () => {
    lfoRef.current?.stop();
    lfoRef.current?.disconnect();
    lfoRef.current = null;

    lfoGainRef.current?.disconnect();
    lfoGainRef.current = null;

    offsetRef.current?.stop();
    offsetRef.current?.disconnect();
    offsetRef.current = null;
  };

  const applyModulation = (ctx, gain, oscLeft, oscRight) => {
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(modulationRate, ctx.currentTime);

    if (modulationType === 'am') {
      const modulationDepth = 0.5;
      const offset = ctx.createConstantSource();
      offset.offset.setValueAtTime(
        volume - modulationDepth / 2,
        ctx.currentTime
      );
      offset.start();

      lfoGain.gain.setValueAtTime(modulationDepth / 2, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      offset.connect(gain.gain);

      offsetRef.current = offset;
    }

    if (modulationType === 'fm') {
      const fmDepth = 20;
      lfoGain.gain.setValueAtTime(fmDepth, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscLeft.frequency);
      if (isBinaural) {
        lfoGain.connect(oscRight.frequency);
      }
    }

    lfo.start();
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;
  };

  const startAudio = () => {
    const ctx = audioContextRef.current;

    // ✅ Reprendre le contexte audio si suspendu (souvent le cas au démarrage)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const merger = ctx.createChannelMerger(2);

    oscLeft.type = 'sine';
    oscRight.type = 'sine';

    oscLeft.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscRight.frequency.setValueAtTime(
      isBinaural ? frequency + binauralOffset : frequency,
      ctx.currentTime
    );

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    if (modulationEnabled) {
      applyModulation(ctx, gain, oscLeft, oscRight);
    }

    oscLeft.start();
    oscRight.start();

    leftOscRef.current = oscLeft;
    rightOscRef.current = oscRight;
    gainRef.current = gain;
    filterRef.current = filter;
    mergerRef.current = merger;
  };

  const stopAudio = () => {
    const ctx = audioContextRef.current;

    cleanupModulation();

    if (gainRef.current) {
      gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainRef.current.gain.setValueAtTime(
        gainRef.current.gain.value,
        ctx.currentTime
      );
      gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    }

    setTimeout(() => {
      leftOscRef.current?.stop();
      rightOscRef.current?.stop();
      leftOscRef.current?.disconnect();
      rightOscRef.current?.disconnect();
      gainRef.current?.disconnect();
      filterRef.current?.disconnect();
      mergerRef.current?.disconnect();

      leftOscRef.current = null;
      rightOscRef.current = null;
      gainRef.current = null;
      filterRef.current = null;
      mergerRef.current = null;
    }, 1600);
  };
  // Log global de l’état audio
  useEffect(() => {
    console.log('[AUDIO DEBUG]', {
      isPlaying,
      frequency,
      isBinaural,
      binauralOffset,
      volume,
      modulationEnabled,
      modulationType,
      modulationRate,
    });
  }, [
    isPlaying,
    frequency,
    isBinaural,
    binauralOffset,
    volume,
    modulationEnabled,
    modulationType,
    modulationRate,
  ]);
}
