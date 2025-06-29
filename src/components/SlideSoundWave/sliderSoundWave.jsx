import { useState } from 'react';
import {
  SliderContainer,
  Slider,
  ValueDisplay,
  BinauralInfo,
  VolumeControlContainer,
} from './sliderSoundWaveStyled';
import FrequencyPresets from '../FrequencyPresets/frequencyPresets';
import PlayToggleButton from '../PlayToggle/playToggleButton';
import BinauralToggle from '../BinauralToggle/binauralToggle';
import AudioEngine from '../AudioEngine/AudioEngine';
import ModulationToggle from '../ModulationToggle/modulationToggle';
import uiLabels from '../../utils/uiLabels';

function SliderSoundWave({ language }) {
  const [frequency, setFrequency] = useState(432);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBinaural, setIsBinaural] = useState(false);
  const [binauralOffset, setBinauralOffset] = useState(6);
  const [volume, setVolume] = useState(0.1);
  const [modulationEnabled, setModulationEnabled] = useState(false);
  const [modulationType, setModulationType] = useState('am');
  const [modulationRate, setModulationRate] = useState(6);

  const t = uiLabels[language];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleSliderChange = (value) => setFrequency(value);
  const handlePresetSelect = (value) => setFrequency(value);
  const handleBinauralToggle = () => setIsBinaural((prev) => !prev);

  return (
    <SliderContainer>
      <FrequencyPresets onSelect={handlePresetSelect} labels={t} />

      <Slider
        type="range"
        min="100"
        max="1000"
        value={frequency}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
      />
      <ValueDisplay>
        {t.baseFreq} : {frequency} Hz
      </ValueDisplay>

      <BinauralToggle
        isBinaural={isBinaural}
        onToggle={handleBinauralToggle}
        labels={t}
      />

      {isBinaural && (
        <>
          <Slider
            type="range"
            min="1"
            max="50"
            value={binauralOffset}
            onChange={(e) => setBinauralOffset(Number(e.target.value))}
          />
          <BinauralInfo>
            {t.binauralGap} : {binauralOffset} Hz
          </BinauralInfo>
        </>
      )}

      <VolumeControlContainer>
        <Slider
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <ValueDisplay>
          {t.volume} : {(volume * 100).toFixed(0)}%
        </ValueDisplay>
      </VolumeControlContainer>

      <ModulationToggle
        isEnabled={modulationEnabled}
        onToggle={setModulationEnabled}
        modulationType={modulationType}
        onTypeChange={setModulationType}
        modulationRate={modulationRate}
        onRateChange={setModulationRate}
        labels={t}
      />

      <PlayToggleButton isPlaying={isPlaying} onToggle={togglePlay} />

      <AudioEngine
        isPlaying={isPlaying}
        frequency={frequency}
        binauralOffset={binauralOffset}
        isBinaural={isBinaural}
        volume={volume}
        modulationEnabled={modulationEnabled}
        modulationType={modulationType}
        modulationRate={modulationRate}
      />
    </SliderContainer>
  );
}

export default SliderSoundWave;
