

# Therapeutic Sine Wave Tool

This project is a browser-based sound generator designed to explore the **therapeutic and perceptual impact of sine waves**. Built in React with the **Web Audio API**, it invites slow listening and subtle interaction with tone, space and movement.

It was conceived as a quick prototype, coded in a day, to create a focused, calming interface for **intentional sound experiences**. Users can shape the tone’s frequency, add binaural differences, modulate the waveform, and control dynamics, all in real time.

---

## ✨ Core Ideas

* **Sine waves** are mathematically pure and physiologically direct—ideal for focused listening or meditative use
* **Binaural beats** create perceived rhythmic oscillations by sending slightly different frequencies to each ear (ex: 432 Hz vs 438 Hz)
* **Amplitude and frequency modulation** introduce rhythmic or harmonic movement
* **Real-time sound shaping** allows playful, somatic interaction: the sound changes as you move

---

## 🎚️ Key Features & Parameters

| Parameter                   | Controlled By                  | Effect                                            |
| --------------------------- | ------------------------------ | ------------------------------------------------- |
| Frequency (100–1000 Hz)     | Slider or preset buttons       | Defines base tone                                 |
| Volume (0–1)                | Slider                         | Sets gain amplitude                               |
| Binaural Offset (1–50 Hz)   | Slider (only in binaural mode) | Adds beat-based oscillation between ears          |
| Modulation Type             | AM / FM toggle                 | Type of modulation (volume vs. pitch)             |
| Modulation Rate (0.1–20 Hz) | Slider                         | Speed of modulation (e.g. slow pulses vs tremolo) |

---

## 🧠 Code Highlights

### 🎵 1. Dynamic Audio Context with Modulation and Binaural Logic

```js
if (isBinaural) {
  leftOsc.frequency.setValueAtTime(frequency - offset / 2, context.currentTime);
  rightOsc.frequency.setValueAtTime(frequency + offset / 2, context.currentTime);
} else {
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
}
```

→ This logic creates **two separate sine tones** when binaural is enabled, one for each ear, spaced by the offset (e.g. 6 Hz difference). Otherwise, a single oscillator is used for both channels

---

### 🌊 2. Modulation Engine: AM and FM Synth Implementation

```js
if (modulationType === 'am') {
  modulator.connect(gain.gain); // amplitude modulation
} else {
  modulator.connect(oscillator.frequency); // frequency modulation
}
```

→ The same modulating oscillator is conditionally routed: either to the **gain node** for volume-based tremolo (AM), or to the **frequency** of the carrier oscillator for vibrato/pitch movement (FM). This reflects **minimal DSP logic with expressive range**

---

### 🎛️ 3. Interactive Modulation Parameters via Sliders

```js
<RangeSlider
  type="range"
  min="0.1"
  max="20"
  step="0.1"
  value={modulationRate}
  onChange={(e) => onRateChange(Number(e.target.value))}
/>
```

→ Smooth UI control of modulation rate, allowing the user to shift from imperceptible waves (0.1 Hz) to sharp rhythmic pulses (20 Hz), without audio glitch

---

### 🧩 4. Bilingual UI with Simple Label Injection

```js
const t = uiLabels[language];
...
<ValueDisplay>{t.baseFreq} : {frequency} Hz</ValueDisplay>
```

→ The app uses a compact and scalable **language selector** pattern, where all labels are pulled from a central object. This keeps the UI text easily extensible (currently supports English and French)

---

## 🎧 Why

Pure waveforms are deceptively simple—they offer space for **deep listening**, **intentional focus**, or even **neuroacoustic exploration**. By controlling tone, amplitude, rhythm, and spatialization, this project becomes a **sound playground** for calm, attention and experimentation.

