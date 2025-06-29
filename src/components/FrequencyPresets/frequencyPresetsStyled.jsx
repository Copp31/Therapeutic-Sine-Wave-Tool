import styled from "styled-components";

export const PresetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const PresetButton = styled.button`
  background-color: #ffffff;
  border: 2px solid #888;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
    border-color: #555;
  }

  &:active {
    background-color: #e0e0e0;
    transform: scale(0.98);
  }
`;
