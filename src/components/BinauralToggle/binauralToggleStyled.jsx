import styled from 'styled-components';

export const ToggleContainer = styled.div`
  margin: 1.5rem 0 0.5rem;
`;

export const ToggleButton = styled.button`
  background-color: #ffffff;
  border: 2px solid #888;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    border-color: #444;
  }

  &:active {
    transform: scale(0.97);
  }
`;
