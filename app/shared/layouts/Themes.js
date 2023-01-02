import {StyleSheet} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

const buttonHeight = RFValue(45);

export default StyleSheet.create({
  buttonModal: {
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    height: buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextPrimary: {
    fontSize: RFValue(12),
  },
});
