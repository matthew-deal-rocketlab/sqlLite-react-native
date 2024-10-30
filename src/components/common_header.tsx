import React from 'react';
import styled from 'styled-components/native';

interface CommonHeaderProps {
  itemLeft?: React.ReactElement;
  itemCenter?: React.ReactElement;
  itemRight?: React.ReactElement;
}

export const HeaderWrapper = styled.View`
  ${({theme}) => `
  width: '100%';
  height: 64px;
  padding: 0 5px;
  margin: 0;
  flex-direction: row;
  background-color: ${theme.colors.primary};
`}
`;

export const HeaderLeft = styled.View`
  flex: 1;
  justify-content: center;
`;

export const HeaderCenter = styled.View`
  flex: 4;
  justify-content: center;
  /* border: 1px solid blue; */
`;

export const HeaderRight = styled.View`
  flex: 1;
  justify-content: center;
`;

export const CommonHeader = ({itemLeft, itemCenter, itemRight}: CommonHeaderProps) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>{itemLeft}</HeaderLeft>
      <HeaderCenter>{itemCenter}</HeaderCenter>
      <HeaderRight>{itemRight}</HeaderRight>
    </HeaderWrapper>
  );
};
