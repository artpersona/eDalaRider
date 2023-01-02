import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PadaList, MapScreen, SuccessDelivery} from '../screens';
function PadalaStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PadaList"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name="PadaList" component={PadaList} />
      <Stack.Screen name="PadalaTracking" component={MapScreen} />
      <Stack.Screen name="SuccessDelivery" component={SuccessDelivery} />
    </Stack.Navigator>
  );
}

export default PadalaStack;
