import React from 'react';
import styled from 'styled-components';
import { smartLight } from '../services';
const Container = styled.div`
  padding: 20px;
`;
const StyedInput = styled.input`
  width: 80px;
`;
const SmartLightControls: React.FC = () => {
  const [color, setColor] = React.useState('#457b9d');
  const [brightness, setBrightess] = React.useState('0.4');
  return (
    <Container>
      <h1>Lifx Controls</h1>
      <button onClick={() => smartLight.turnOn()}>On</button>
      <button onClick={() => smartLight.turnOff()}>Off</button>
      <div>
        <span>
          <StyedInput value={color} onChange={(e) => setColor(e.target.value)}></StyedInput>
          <StyedInput value={brightness} onChange={(e) => setBrightess(e.target.value)}></StyedInput>
          <button
            onClick={() => {
              smartLight.setColor(color, parseFloat(brightness));
            }}
          >
            Set
          </button>
        </span>
      </div>
    </Container>
  );
};
export default SmartLightControls;
