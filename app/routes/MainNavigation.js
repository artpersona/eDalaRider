import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MapScreen} from '../screens';
import {useAuthContext} from '../shared/contexts/AuthContext';
import AuthRoutes from './AuthRoutes';
import HomeDrawer from './HomeDrawer';

const Stack = createStackNavigator();

function MainNavigation() {
  const {loggedUser} = useAuthContext();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={loggedUser ? 'HomeDrawer' : 'Auth'}>
      {loggedUser ? (
        <>
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthRoutes} />
      )}
    </Stack.Navigator>
  );
}

export default React.memo(MainNavigation);
