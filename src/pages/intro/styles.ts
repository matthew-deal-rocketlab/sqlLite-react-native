import styled from 'styled-components/native';

export const TitleText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.large}px;
  font-weight: bold;
`}
`;

export const NormalTextWrapper = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.spacing.medium}px;
  justifycontent: center;
  textalign: center;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  max-height: 80px;
  justify-content: center;
  /* border: 1px solid gold; */
`;

export const LogoImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ButtonWrapper = styled.View`
  padding: ${({theme}) => theme.spacing.medium}px;
`;

export const IntroText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;
