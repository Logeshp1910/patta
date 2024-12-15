import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/StackNavigation';
import analytics from '@react-native-firebase/analytics';

const App = () => {
  useEffect(() => {
    analytics().logEvent('app_open', { screen: 'AppLaunch' });
  }, []);

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
};

export default App;