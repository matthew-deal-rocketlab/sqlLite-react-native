import React, {FC} from 'react';
import {ViewProps} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {FullScreenLayout} from './full_screen_layout';
import {CommonHeader} from '../common_header';
import {Button} from '../button';
import styled, {useTheme} from 'styled-components/native';
import {Routes} from '../../routes/routes';

// ### type/interface
type ExtraHeaderFooterLayoutProps = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  onPageEnter?: () => void;
  onPageExit?: () => void;
  showMenu?: boolean;
  showBack?: boolean;
};
type HeaderFooterLayoutProps = ViewProps & ExtraHeaderFooterLayoutProps;

// ### Styles
export const ButtonText = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

const StyledBody: FC<ViewProps & ExtraHeaderFooterLayoutProps> = styled.View<ViewProps & ExtraHeaderFooterLayoutProps>`
  ${({theme}) => `
  flex: 1;
  background-color: ${theme.colors.primary};
`}
`;

// ### HeaderFooterLayout Component
export const HeaderFooterLayout: FC<HeaderFooterLayoutProps> = ({
  style,
  children,
  justifyContent = 'center',
  alignItems = 'center',
  showBack = true,
  showMenu = true,
  onPageEnter,
  onPageExit,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const onPressBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const onPressMenu = () => {
    navigation.navigate(Routes.Settings as never);
  };

  const showGoBack = navigation && navigation.canGoBack() && showBack;
  // only show menu button if not in settings screen
  const showMenuButton = showMenu && route.name !== Routes.Settings;

  return (
    <FullScreenLayout onPageEnter={onPageEnter} onPageExit={onPageExit}>
      <CommonHeader
        itemLeft={
          showGoBack ? (
            <Button backgroundColor={theme.colors.primary} onPress={onPressBack}>
              <ButtonText>{'\u{304F}'}</ButtonText>
            </Button>
          ) : (
            <></>
          )
        }
        itemCenter={<ButtonText>{' ' || `Route: ${route.name}`}</ButtonText>}
        itemRight={
          showMenuButton ? (
            <Button backgroundColor={theme.colors.primary} onPress={onPressMenu}>
              <ButtonText>{'\u{2630}'}</ButtonText>
            </Button>
          ) : (
            <></>
          )
        }
      />
      <StyledBody justifyContent={justifyContent} alignItems={alignItems} style={style}>
        {children}
      </StyledBody>
    </FullScreenLayout>
  );
};
