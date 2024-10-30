import React from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import styled from 'styled-components/native';

const BusyContainer = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.loadingOverlay};
`;

export const BusyIndicator = () => {
  return (
    <Modal transparent={true}>
      <BusyContainer>
        <ActivityIndicator size="large" />
      </BusyContainer>
    </Modal>
  );
};
