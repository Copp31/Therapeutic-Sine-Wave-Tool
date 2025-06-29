import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 0.95rem;
  color: #333;
`;

export const Select = styled.select`
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;
