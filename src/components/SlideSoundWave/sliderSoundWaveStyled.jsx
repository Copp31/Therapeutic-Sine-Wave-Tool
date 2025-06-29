import styled from 'styled-components';

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Slider = styled.input`
  width: 80%;
  margin: 1rem 0;
`;

export const ValueDisplay = styled.p`
  font-size: 1.1rem;
  color: #444;
`;

export const BinauralInfo = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
`;

export const VolumeControlContainer = styled.div`
  position: absolute;
  top: 10%;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.85);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
