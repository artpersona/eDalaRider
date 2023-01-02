import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Test} from '../screens';
import {CustomDrawer, CustomHeader} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../shared/layouts';
import DeliveryTabs from './DeliveryTabs';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  //   const {loggedUser} = useAuthContext();

  const [isConnected, setIsConnected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <CustomHeader theme="primary" showNotif={true} />
      <Drawer.Navigator
        options={{
          unmountInactiveRoutes: true,
        }}
        useLegacyImplementation={true}
        drawerPosition={'left'}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          animationEnabled: true,
          headerShown: false,
          // header: props => <CustomHeader />,
          swipeEnabled: false,
        }}
        detachInactiveScreens={true}>
        <Drawer.Screen
          name="Padala"
          component={DeliveryTabs}
          options={{
            drawerLabel: 'Padala',
            drawerIcon: ({}) => (
              <MaterialCommunityIcons
                name="home-outline"
                size={26}
                color={Colors.primary}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
// const styles = StyleSheet.create({
//   modalHeader: {
//     fontSize: RFValue(17),
//     fontFamily: 'Poppins-SemiBold',
//     color: Colors.red,
//     textAlign: 'center',
//   },
//   subText: {
//     color: Colors.grey,
//     fontSize: RFValue(11),
//     marginTop: '3%',
//     fontFamily: 'Poppins-Regular',
//     textAlign: 'center',
//   },
// });
export default MyDrawer;
