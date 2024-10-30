import React, {FC} from 'react';
import {ImageSourcePropType, ViewProps} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useFocusEffect} from '@react-navigation/native';

// types/interface
type ExtraFullScreenLayoutProps = {
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  onPageEnter?: () => void;
  onPageExit?: () => void;
  backgroundImageSrc?: ImageSourcePropType;
};
type FullScreenLayoutProps = ViewProps & ExtraFullScreenLayoutProps;

const PageWrapper = styled.View`
  ${({theme}) => `
flex: 1;
margin: 0;
padding: 0;
background-color: ${theme.colors.primary};
`}
`;

const ImagePageWrapper = styled.ImageBackground`
  flex: 1;
  margin: 0;
  padding: 0;
`;

const ContentContainer = styled.SafeAreaView<SafeAreaViewProps & ExtraFullScreenLayoutProps>`
  flex: 1;
  justify-content: ${({justifyContent}) => justifyContent};
  align-items: ${({alignItems}) => alignItems};
`;

export const FullScreenLayout: FC<FullScreenLayoutProps> = ({
  children,
  backgroundImageSrc,
  justifyContent = 'center',
  alignItems = 'center',
  style,
  onPageEnter,
  onPageExit,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (onPageEnter) onPageEnter();
      return () => {
        if (onPageExit) onPageExit();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  if (backgroundImageSrc) {
    return (
      <ImagePageWrapper source={backgroundImageSrc} style={style}>
        <ContentContainer style={{justifyContent, alignItems}}>{children}</ContentContainer>
      </ImagePageWrapper>
    );
  }
  return (
    <PageWrapper style={style}>
      <ContentContainer style={{justifyContent, alignItems}}>{children}</ContentContainer>
    </PageWrapper>
  );
};
