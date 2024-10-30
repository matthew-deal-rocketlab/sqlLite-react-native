import styled from 'styled-components/native';
import {SPLASH_BACKGROUND_COLOR} from '../../constants';

export const SplashPageWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${SPLASH_BACKGROUND_COLOR};
`;

export const SplashPageLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const SplashPageText = styled.Text`
  color: black;
  font-size: 24px;
`;
