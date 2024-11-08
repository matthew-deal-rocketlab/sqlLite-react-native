import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  ${({theme}) => `
    flex: 1;
    padding: 0 ${theme.spacing.medium}px;
    width: 100%;
  `}
`;

export const PostCard = styled.View`
  ${({theme}) => `
    padding: ${theme.spacing.medium}px;
    margin-bottom: ${theme.spacing.medium}px;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.medium}px;
    border: 1px solid ${theme.colors.secondary};
  `}
`;

export const PostTitle = styled.Text`
  ${({theme}) => `
    font-size: ${theme.fontSizes.large}px;
    font-weight: bold;
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.small}px;
  `}
`;

export const PostContent = styled.Text`
  ${({theme}) => `
    font-size: ${theme.fontSizes.medium}px;
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.small}px;
  `}
`;

export const PostDate = styled.Text`
  ${({theme}) => `
    font-size: ${theme.fontSizes.small}px;
    color: ${theme.colors.secondary};
    font-style: italic;
  `}
`;

export const AddPostWrapper = styled.View`
  ${({theme}) => `
    padding: ${theme.spacing.medium}px;
    margin-bottom: ${theme.spacing.medium}px;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.medium}px;
  `}
`;

export const ButtonWrapper = styled.View`
  ${({theme}) => `
    margin-bottom: ${theme.spacing.medium}px;
  `}
`;
