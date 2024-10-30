import styled from 'styled-components/native';

import {HeaderFooterLayout} from '../../components/layouts/header_footer_layout';

export const StyledHeaderFooterLayout = styled(HeaderFooterLayout)``;

export const LoginFormWrapper = styled.View`
  ${({theme}) => `
  flex: 1;
  padding: ${theme.spacing.medium}px;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.medium}px;
`}
`;

export const UnicodeIcon = styled.Text`
  font-size: 60px;
  color: green;
`;

export const ButtonTextWrapper = styled.View`
  ${({theme}) => `
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.small}px;
`}
`;

export const ButtonText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

export const ErrorText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

export const SubmitButtonWrapper = styled.View`
  width: 50%;
`;
