import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import MainNavigation from './app/routes/MainNavigation';
import AuthProvider from './app/shared/contexts/AuthContext';
import ConfigProvider from './app/shared/contexts/ConfigContext';
import PadalaProvider from './app/shared/contexts/PadalaContext';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
const App = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <PadalaProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </PadalaProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
