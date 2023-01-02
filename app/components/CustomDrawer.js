/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {Colors} from '../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useConfigContext} from '../shared/contexts/ConfigContext';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {Button} from 'react-native-elements';
function CustomDrawerContent(props) {
  const {logout} = useAuthContext();
  const {setDrawerStatus} = useConfigContext();
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;

  const isDrawerOpen = useDrawerStatus();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      logout();
    }, 1000);
  };

  useEffect(() => {
    let status = isDrawerOpen === 'open';
    setDrawerStatus(status);
  }, [isDrawerOpen]);

  return (
    <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <DrawerContentScrollView {...props} style={{marginTop: '5%', zIndex: 1}}>
        {state.routes.map((route, index) => {
          const {drawerLabel, drawerIcon, activeTintColor, groupName} =
            descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else {
            newGroup = false;
          }
          return (
            <React.Fragment key={route.key}>
              <DrawerItem
                key={route.key}
                label={`${drawerLabel}`}
                labelStyle={styles.labelStyle}
                focused={
                  state.index ===
                  state.routes.findIndex(e => e.name === route.name)
                }
                activeTintColor={activeTintColor}
                onPress={() => {
                  return navigation.navigate(route.name);
                }}
                icon={drawerIcon}
                style={{justifyContent: 'center'}}
              />
            </React.Fragment>
          );
        })}
      </DrawerContentScrollView>

      <Button
        buttonStyle={styles.logoutButton}
        title={'Logout'}
        titleStyle={[styles.labelStyle, {color: Colors.white}]}
        containerStyle={{
          position: 'absolute',
          zIndex: 999,
          bottom: RFValue(50),
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
        }}
        onPress={handleLogout}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: Colors.primary,
    width: '90%',
    paddingVertical: '5%',
  },
  drawerItemContainer: {
    justifyContent: 'center',
    marginLeft: 15,
    width: '70%',
  },
  iconContainer: {
    height: '12%',
  },
  image: {
    alignSelf: 'center',
    borderRadius: 70 / 2,
    height: 70,
    marginLeft: 10,
    width: 70,
  },
  imageContainer: {
    justifyContent: 'center',
    width: '30%',
  },
  labelStyle: {
    color: Colors.primary,
    fontSize: RFValue(13),
    fontFamily: 'Poppins-Regular',
    marginLeft: RFValue(-20),
  },
  loginText: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  collapsed__container: {
    backgroundColor: Colors.primary,
  },
  dropDown__action: {},

  collapse__icon: {
    position: 'absolute',
    right: '10%',
    top: '30%',
  },
});

export default React.memo(CustomDrawerContent);
