import React from 'react';
import styled from '@emotion/styled';

const ErrorText = styled.span`
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  color: white;
`;

const Error = () => {
  return <ErrorText>Something went wrong</ErrorText>;
};

export default Error;
