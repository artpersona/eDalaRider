import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Hamburger from 'react-native-animated-hamburger';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useConfigContext} from '../shared/contexts/ConfigContext';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../shared/layouts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function CustomHeader({showBackButton, title, theme, showNotif}) {
  const navigation = useNavigation();
  const {drawerStatus} = useConfigContext();

  const unreadNotif = 0;
  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View
      style={
        theme === 'primary'
          ? styles.container
          : [styles.container, {backgroundColor: 'white'}]
      }>
      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-left"
            size={RFValue(20)}
            color={theme === 'primary' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      ) : (
        <Hamburger
          type="spinCross"
          color="white"
          active={drawerStatus}
          onPress={handleDrawerToggle}
        />
      )}

      {showNotif && (
        <TouchableOpacity onPress={() => console.log('Test')}>
          <MaterialCommunityIcons
            name="bell-ring"
            size={RFValue(26)}
            color={theme === 'primary' ? 'white' : 'black'}
          />
          {unreadNotif > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadNotif}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {title && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={
              theme === 'primary'
                ? [styles.title, {color: 'white'}]
                : styles.title
            }>
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(16),
    color: 'black',
  },
  badgeText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: RFValue(9),
  },
  badge: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'red',
    width: RFValue(20),
    height: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    top: -RFValue(5),
    right: RFValue(-5),
  },
  container: {
    height: RFValue(60),
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    zIndex: 9999,
  },

  image: {
    height: RFValue(60),
    width: RFValue(60),
  },
});

export default CustomHeader;
