// A picker/selector component implemented with React-Native Core components

import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const PICKER_ITEM_HEIGHT = 50;
const PICKER_VISIBLE_ITEMS = 5;

type PickerItemProps = {label: string; value: string};

type PickerProps = {
  selectedValue: string;
  onValueChange: (value: string, index: number) => void;
  children: ReactElement[];
};

interface PickerIF {
  Item: ({label, value}: PickerItemProps) => JSX.Element;
}

const Picker_Item = ({label}: PickerItemProps) => {
  return <Text>{label}</Text>;
};

// ### Styles
const PickerLabel = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

const PickerModalOverlay = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.loadingOverlay};
`;

const PickerModalContentContainer = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  width: 80%;
  max-height: ${PICKER_VISIBLE_ITEMS * PICKER_ITEM_HEIGHT}px;
  border-radius: ${({theme}) => theme.borderRadius.medium}px;
`;

const PickerItemOption = styled.TouchableOpacity`
  height: ${PICKER_ITEM_HEIGHT}px;
  padding: 0 ${({theme}) => theme.spacing.medium}px;
  justify-content: center;
`;
const PickerItemOptionLabel = styled.Text`
  ${({theme}) => `
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.medium}px;
`}
`;

const PickerItemOptionSeparator = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.secondary};
`;

const Picker: React.FC<PickerProps> & PickerIF = ({children, selectedValue, onValueChange}) => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [opened, setOpened] = useState(false);

  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const numberOfChildren = childrenArray.length;

  const renderItems = ({item, index}: {item: ReactElement; index: number}) => {
    const isEmptyItem = item.props.value === '';
    const handlePressItemOption = () => {
      if (!isEmptyItem) onValueChange(item.props.value, index);
      setOpened(false);
    };

    const pickerStyle = StyleSheet.create({item: {fontWeight: isEmptyItem ? 'bold' : 'normal'}});

    return (
      <PickerItemOption onPress={handlePressItemOption}>
        <PickerItemOptionLabel style={pickerStyle.item}>{item.props.label}</PickerItemOptionLabel>
      </PickerItemOption>
    );
  };

  useEffect(() => {
    if (numberOfChildren > 0) {
      const selectedItem = childrenArray.filter(item => {
        const pickerItemProps = item.props as PickerItemProps;
        return pickerItemProps.value === selectedValue;
      });
      setSelectedLabel(selectedItem.length === 1 ? selectedItem[0].props.label : '');
    }
  }, [selectedValue, numberOfChildren, childrenArray]);

  const renderItemSeparator = () => <PickerItemOptionSeparator />;

  return (
    <>
      <TouchableOpacity onPress={() => setOpened(true)}>
        <PickerLabel>{selectedLabel} &#9660;</PickerLabel>
      </TouchableOpacity>

      <Modal visible={opened} transparent={true} onRequestClose={() => setOpened(false)}>
        <PickerModalOverlay onPress={() => setOpened(false)}>
          <PickerModalContentContainer>
            <FlatList
              data={childrenArray}
              renderItem={renderItems}
              keyExtractor={(_, index: number) => `${index}`}
              ItemSeparatorComponent={renderItemSeparator}
            />
          </PickerModalContentContainer>
        </PickerModalOverlay>
      </Modal>
    </>
  );
};

Picker.Item = Picker_Item;

export {Picker};
