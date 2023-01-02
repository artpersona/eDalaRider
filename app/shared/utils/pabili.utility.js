import {Colors} from '../layouts';
import {RFValue} from 'react-native-responsive-fontsize';
const indicatorStyle = {
  stepIndicatorSize: 27,
  currentStepIndicatorSize: 27,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: 'rgba(29, 183, 174, 0.8)',
  stepStrokeWidth: 5,
  stepStrokeFinishedColor: 'rgba(29, 183, 174, 0.8)',
  stepStrokeUnFinishedColor: '#EAEAEA',
  separatorFinishedColor: Colors.primary,
  separatorUnFinishedColor: '#EAEAEA',
  stepIndicatorFinishedColor: Colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: Colors.primary,
  stepIndicatorLabelFontSize: RFValue(12),
  currentStepIndicatorLabelFontSize: RFValue(12),
  stepIndicatorLabelCurrentColor: Colors.primary,
  stepIndicatorLabelFinishedColor: Colors.red,
  stepIndicatorLabelUnFinishedColor: Colors.green,
  labelColor: '#999999',
  labelSize: RFValue(12),
  currentStepLabelColor: Colors.primary,
  labelAlign: 'center',
};

const indicatorLabel = ['Shipment', 'Recipient', 'Finalize'];

export {indicatorStyle, indicatorLabel};
