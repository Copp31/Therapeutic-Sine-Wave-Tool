import { ToggleContainer, ToggleButton } from './binauralToggleStyled';

function BinauralToggle({ isBinaural, onToggle, labels }) {
  return (
    <ToggleContainer>
      <ToggleButton onClick={onToggle}>
        {isBinaural ? labels.binauralOn : labels.binauralOff}
      </ToggleButton>
    </ToggleContainer>
  );
}

export default BinauralToggle;
