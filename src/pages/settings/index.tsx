// A dummy page that simply shows the name of the current route and a button to go to another route

import React from 'react';
import {Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button} from '../../components/button';
// import {StorageKeys} from '../../constants';
// import {readString} from '../../utils/storage';
import {HeaderFooterLayout} from '../../components/layouts/header_footer_layout';
import {ButtonWrapper, ColumnLeft, ColumnRight, ContentWrapper, Label, Row, SectionLabel, Spacer} from '../blog/styles';
import {useAppConfigModel} from '../../models/app_config';
import {useUserModel} from '../../models/user';
import {Picker} from '../../components/picker';

const prt = console.log;

const SettingOption = ({label, children}: {label: string; children: JSX.Element}) => {
  return (
    <Row>
      <ColumnLeft>
        <Label>{label}</Label>
      </ColumnLeft>
      <ColumnRight>{children}</ColumnRight>
    </Row>
  );
};

// ### SettingsPage Component
export const SettingsPage = () => {
  const navigation = useNavigation();
  const userModel = useUserModel();
  const userActions = userModel.actions();
  const {userDetails, isAuthenticated} = userModel;
  const {isDarkmode, setIsDarkmode, languageCode, setLanguageCode} = useAppConfigModel();

  // const getEmail = async () => {
  //   const userEmail = await readString(StorageKeys.USER_EMAIL, '');
  //   // setEmail(userEmail);
  // };

  const onPageEnter = () => {
    prt(`SettingsPage:onPageEnter ${new Date()}`);
  };

  const onChangeDarkMode = (newValue: boolean) => setIsDarkmode(newValue);

  const onPressLogout = async () => {
    await userActions.signOut(navigation);
  };

  return (
    <HeaderFooterLayout justifyContent="center" alignItems="center" onPageEnter={onPageEnter}>
      <ContentWrapper>
        <SectionLabel>App Configuration</SectionLabel>
        <SettingOption label={`Dark mode: ${isDarkmode}`}>
          <Switch value={isDarkmode} onValueChange={onChangeDarkMode} />
        </SettingOption>

        <SettingOption label={`Current language: ${languageCode}`}>
          <Picker selectedValue={languageCode} onValueChange={setLanguageCode}>
            <Picker.Item label="Select language" value="" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="Hindi" value="hi" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="Chinese" value="zh" />
          </Picker>
        </SettingOption>

        <Spacer />

        <SectionLabel>User Details</SectionLabel>
        <SettingOption label={'User name'}>
          <Label>{`${isAuthenticated() ? userDetails.firstname : 'Not authenticated'}`}</Label>
        </SettingOption>

        <SettingOption label={'email'}>
          <Label>{`${isAuthenticated() ? userDetails.email : ' '}`}</Label>
        </SettingOption>

        <Spacer />

        {isAuthenticated() && (
          <ButtonWrapper>
            <Button onPress={onPressLogout}>{'Logout'}</Button>
          </ButtonWrapper>
        )}
      </ContentWrapper>
    </HeaderFooterLayout>
  );
};
