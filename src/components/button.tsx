// standard app button

import React from 'react';
import {TextProps, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

// ### Type / interface
type StyledButtonProps = TouchableOpacityProps & {color?: string; backgroundColor?: string};

// ### Styles
const StyledButton: React.FC<StyledButtonProps> = styled.TouchableOpacity<StyledButtonProps>`
  ${({theme, ...props}) => `
    min-width: 100%;
    padding: ${theme.spacing.small}px 0;
    background-color: ${props.backgroundColor ? props.backgroundColor : theme.colors.accent};
    align-items: center;
    justify-content: center;
    border-radius: ${theme.borderRadius.small}px;
    
  `}
`;

type StyledButtonTextProps = TextProps & {color?: string};
const ButtonText: React.FC<StyledButtonTextProps> = styled.Text<StyledButtonTextProps>`
  ${({theme, ...props}) => `  
    color: ${props.color ? props.color : theme.colors.secondary};
    font-size: ${theme.fontSizes.medium}px;
  `}
`;

// ### Button Component
export const Button = ({color, backgroundColor, ...props}: StyledButtonProps) => {
  return (
    <StyledButton onPress={props.onPress} backgroundColor={backgroundColor}>
      {typeof props.children === 'string' ? <ButtonText color={color}>{props.children}</ButtonText> : props.children}
    </StyledButton>
  );
};
