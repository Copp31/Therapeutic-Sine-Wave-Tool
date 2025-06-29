import { ToggleButton } from "./playToggleButtonStyled";

function PlayToggleButton({ isPlaying, onToggle }) {
  return (
    <ToggleButton onClick={onToggle}>
      {isPlaying ? "Stop" : "Play"}
    </ToggleButton>
  );
}

export default PlayToggleButton;
