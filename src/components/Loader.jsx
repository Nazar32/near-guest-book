import React from 'react';
import styled from 'styled-components';

export const Loader = ({ ...props }) => (
  <StyledSpinner viewBox="0 0 50 50" {...props}>
    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="2" />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 2rem;
  height: 2rem;

  & circle {
    stroke: var(--black);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
