import React from 'react';
import {
  ModulationContainer,
  CheckboxLabel,
  ModulationSelect,
  SliderLabel,
  RangeSlider,
} from './modulationToggleStyled';

function ModulationToggle({
  isEnabled,
  onToggle,
  modulationType,
  onTypeChange,
  modulationRate,
  onRateChange,
  labels,
}) {
  return (
    <ModulationContainer>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        {labels.enableMod}
      </CheckboxLabel>

      {isEnabled && (
        <>
          <CheckboxLabel>
            {labels.modType} :
            <ModulationSelect
              value={modulationType}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <option value="am">{labels.modAM}</option>
              <option value="fm">{labels.modFM}</option>
            </ModulationSelect>
          </CheckboxLabel>

          <SliderLabel>
            {labels.modRate} : {modulationRate} Hz
            <RangeSlider
              type="range"
              min="0.1"
              max="20"
              step="0.1"
              value={modulationRate}
              onChange={(e) => onRateChange(Number(e.target.value))}
            />
          </SliderLabel>
        </>
      )}
    </ModulationContainer>
  );
}

export default ModulationToggle;
