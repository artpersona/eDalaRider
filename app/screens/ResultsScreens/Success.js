import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import {deviceWidth} from '../../shared/utils/device.utility';
import {Colors} from '../../shared/layouts';
function Success({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/animations/success.json')}
          autoPlay
          style={{
            width: deviceWidth * 0.55,
            height: deviceWidth * 0.55,
          }}
          loop={false}
        />
      </View>
      <View style={styles.paymentStatusContainer}>
        <Text style={styles.confirmationText}>Parcel Delivered</Text>
        <Text style={styles.subText}>Your payment has been processed!</Text>
        <Text style={styles.subText}>
          Details of transaction are included below
        </Text>
      </View>
      <View style={[styles.divider, {marginVertical: '4%'}]} />
      {/* <Text style={styles.transactionNumber}>
      Transaction Code: {transactionId.substring(0, 8)}
    </Text> */}

      <View style={styles.paymentDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>AMOUNT PAID</Text>
          <Text style={styles.value}>PHP 500.00</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>MODE OF PAYMENT</Text>
          <Text style={styles.value}>COD</Text>
        </View>
        <View style={styles.divider} />
        {/* <View style={styles.row}>
        <Text style={styles.label}>TRANSACTION DATE</Text>
        <Text style={styles.value}>{data.paymentDate}</Text>
      </View> */}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PadaList')}>
        <Text style={styles.buttonText}>Return to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animationContainer: {
    alignItems: 'center',
  },
  paymentStatusContainer: {
    alignItems: 'center',
    marginVertical: '6%',
  },
  confirmationText: {
    fontSize: RFValue(20),
    color: Colors.green,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: '3%',
  },
  subText: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    color: '#A9A9A9',
  },
  divider: {
    marginVertical: '4%',
    width: '85%',
    backgroundColor: Colors.lightGrey,
    height: 1,
    alignSelf: 'center',
  },
  transactionNumber: {
    alignSelf: 'center',
    fontSize: RFValue(11),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.secondary,
    textTransform: 'uppercase',
  },
  paymentDetails: {
    marginTop: '7%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  label: {
    fontSize: RFValue(10),
    fontFamily: 'Poppins-SemiBold',
    color: '#A9A9A9',
  },
  value: {
    fontSize: RFValue(10),
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 999,
    top: RFValue(5),
    left: RFValue(5),
  },

  button: {
    width: '85%',
    height: RFValue(55),
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    marginTop: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
});

export default Success;
