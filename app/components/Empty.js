import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
function Empty({message, width, height}) {
  return (
    <View style={[styles.container, {width, height}]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  text: {
    fontSize: RFValue(13),
    fontFamily: 'Poppins-Regular',
    color: Colors.grey,
  },
});

export default Empty;
