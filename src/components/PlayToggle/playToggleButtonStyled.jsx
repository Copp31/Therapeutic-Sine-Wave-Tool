import styled from "styled-components";

export const ToggleButton = styled.button`
  background-color: #ffffff;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f7f7f7;
    border-color: #222;
  }

  &:active {
    background-color: #eaeaea;
    transform: scale(0.97);
  }
`;
