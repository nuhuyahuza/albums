import React from 'react';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/redux/store';
import { StatusBar } from 'react-native';

// Default Theme
const lightTheme = {
  ...DefaultTheme,
};

// custom dark theme
const darkTheme = {
  ...MD3DarkTheme,
};

const App: React.FC = () => {
  const { colors } = useTheme();

  // Assuming that dark theme has a darker background color
  const isDarkTheme = colors.background === '#000000';

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <StatusBar
          barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
