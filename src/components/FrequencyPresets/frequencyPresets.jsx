import { PresetsContainer, PresetButton } from './frequencyPresetsStyled';

function FrequencyPresets({ onSelect, labels }) {
  const presets = [
    { label: labels.preset1, value: 174 },
    { label: labels.preset2, value: 285 },
    { label: labels.preset3, value: 396 },
    { label: labels.preset4, value: 432 },
    { label: labels.preset5, value: 528 },
    { label: labels.preset6, value: 639 },
    { label: labels.preset7, value: 852 },
  ];

  return (
    <PresetsContainer>
      {presets.map(({ label, value }) => (
        <PresetButton key={value} onClick={() => onSelect(value)}>
          {label}
        </PresetButton>
      ))}
    </PresetsContainer>
  );
}

export default FrequencyPresets;
