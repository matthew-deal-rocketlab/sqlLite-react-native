import styled from 'styled-components/native';
// import {HeaderFooterLayout} from '../../components/layouts/header_footer_layout';

export const ContentWrapper = styled.View`
  ${({theme}) => `
  flex: 1;
padding: 0 ${theme.spacing.medium}px;
`}
`;

export const SectionLabel = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
  font-weight: bold;
`}
`;

export const Label = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

export const Row = styled.View`
  ${({theme}) => `
  flex: 1;
  flex-direction: row;
  max-height: 64px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.colors.secondary};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`}
`;

export const ColumnLeft = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const ColumnRight = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

export const ButtonWrapper = styled.View`
  ${({theme}) => `
  padding: 0 ${theme.spacing.extralarge}px;
  margin-bottom: ${theme.spacing.medium}px;
`}
`;

export const Spacer = styled.View`
  ${({theme}) => `
height: ${theme.spacing.medium}px;
`}
`;
