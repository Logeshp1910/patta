import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Aboutus from '../component/Aboutus';
import Privacy from '../component/Privacy';
import Main from '../component/Main';
import Loading from '../component/Loading';
import Shares from '../component/Shares';
import analytics from '@react-native-firebase/analytics';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const trackScreenView = async (state) => {
    if (state) {
      const currentRoute = state.routes[state.index];
      const screenName = currentRoute.name;
      try {
        await analytics().logEvent('screen_view', { screen_name: screenName });
      } catch (error) {
      }
    }
  };

  return (
    <NavigationContainer
      onStateChange={(state) => trackScreenView(state)} 
    >
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
        <Stack.Screen options={{ headerShown: false }} name="Aboutus" component={Aboutus} />
        <Stack.Screen options={{ headerShown: false }} name="Privacy" component={Privacy} />
        <Stack.Screen options={{ headerShown: false }} name="Shares" component={Shares} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;