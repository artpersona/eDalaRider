import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Test, HistorySceen} from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../shared/layouts';
import PadalaStack from './PadalaStack';
const Tab = createBottomTabNavigator();

export default DeliveryTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountInactiveRoutes: true,
      }}>
      <Tab.Screen
        name="PadalaOrders"
        component={PadalaStack}
        options={{
          tabBarLabel: 'Padala Orders',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              size={RFValue(27)}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: RFValue(12),
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistorySceen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="history"
              size={RFValue(27)}
              color={color}
            />
          ),
          tabBarLabelStyle: {
            fontSize: RFValue(12),
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      />
    </Tab.Navigator>
  );
};
