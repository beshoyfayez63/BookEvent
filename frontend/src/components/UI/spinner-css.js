import styled, { keyframes } from 'styled-components';

const animationSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: ${(props) => props.width || '80px'};
  height: ${(props) => props.height || '80px'};
  margin: 0 auto;
  &::after {
    content: ' ';
    display: block;
    width: ${(props) => props.afterWidth || '64px'};
    height: ${(props) => props.afterHeight || '64px'};
    margin: ${(props) => props.margin || '8px'};
    border-radius: 50%;
    border: 6px solid #5101d1;
    border-color: #5101d1 transparent #5101d1 transparent;
    animation: ${animationSpinner} 1.2s linear infinite;
  }
`;

export default LoadingSpinner;
