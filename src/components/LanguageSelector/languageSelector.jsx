import React from 'react';
import { SelectorWrapper, Label, Select } from './languageSelectorStyled';

function LanguageSelector({ language, onChange }) {
  return (
    <SelectorWrapper>
      <Label>
        Langue :{' '}
        <Select value={language} onChange={(e) => onChange(e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </Select>
      </Label>
    </SelectorWrapper>
  );
}

export default LanguageSelector;
