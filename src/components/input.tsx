// standard app input field

import React from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

// ### Type / interface
type StyledTextInputProps = TextInputProps & {errorMessage?: string};

// ### Styles
const StyleTextInput = styled.TextInput<StyledTextInputProps>`
  ${({theme, ...props}) => `
  min-width: 100%;
  background-color: ${theme.colors.shades.white};
  color: ${theme.colors.shades.black};
  border-radius: ${theme.borderRadius.small}px;
  border-color: ${props.errorMessage ? theme.colors.accent : theme.colors.shades.black};
  padding: ${theme.spacing.small}px;
  font-size: ${theme.fontSizes.medium}px;
`}
`;

const ErrorText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

// ### Input Component
export const Input = ({errorMessage = '', ...props}: StyledTextInputProps) => {
  return (
    <>
      <StyleTextInput underlineColorAndroid="white" {...props} />
      {errorMessage.trim() && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
};
