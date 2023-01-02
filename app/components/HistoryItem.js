import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {deviceHeight} from '../shared/utils/device.utility';
import {Colors} from '../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomModal from './CustomModal';
import moment from 'moment';
import {Button} from 'react-native-elements';
function HistoryItem({
  shipmentData,
  recipientData,
  trackingNumber,
  status,
  created_at,
  paymentStatus,
  deliveryFee,
}) {
  let shipper = JSON.parse(shipmentData);
  let recipient = JSON.parse(recipientData);

  let paymentColor = paymentStatus === 'paid' ? 'green' : 'red';
  let statusColor = status === 'delivered' ? 'green' : 'red';

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <View style={styles.detailsContainer}>
          <Text style={styles.tracking_number}>{trackingNumber}</Text>
          <View style={{marginTop: '10%'}}>
            <Text style={styles.nameText}>{shipper?.name}</Text>
            <Text style={styles.dateText}>
              {moment(created_at).format('MMMM DD YYYY')}
            </Text>
          </View>
        </View>
        <View
          style={
            status === 'cancelled'
              ? [styles.statusContainer, {backgroundColor: Colors.red}]
              : status === 'delivered'
              ? [styles.statusContainer, {backgroundColor: Colors.green}]
              : styles.statusContainer
          }>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </TouchableOpacity>

      <CustomModal
        isVisible={modalVisible}
        title={trackingNumber}
        showCancelButton={false}
        showConfirmButton={false}
        onCancel={() => setModalVisible(false)}
        // onConfirm={onPress}
        onClose={() => setModalVisible(false)}
        closeVisible={false}>
        <View style={styles.contextDetails}>
          <View style={styles.peopleDetails}>
            <View style={styles.rowDetails}>
              <Text style={styles.label}>Shipper: </Text>
              <Text style={styles.value}>{shipper?.name}</Text>
            </View>

            <View style={styles.rowDetails}>
              <Text style={styles.label}>Recipient: </Text>
              <Text style={styles.value}>{recipient?.name}</Text>
            </View>
          </View>

          <View style={styles.statuses}>
            <View style={styles.rowDetails}>
              <Text style={styles.label}>Delivery Status: </Text>
              <Text
                style={[
                  styles.value,
                  {textTransform: 'uppercase', color: statusColor},
                ]}>
                {status}
              </Text>
            </View>

            <View style={styles.rowDetails}>
              <Text style={styles.label}>Payment Status: </Text>
              <Text
                style={[
                  styles.value,
                  {textTransform: 'uppercase', color: paymentColor},
                ]}>
                {paymentStatus}
              </Text>
            </View>
          </View>

          <View style={styles.deliveryDetails}>
            <View style={styles.rowDetails}>
              <Text style={styles.label}>Shipper Address: </Text>
              <Text style={styles.addressValue}>
                {shipper?.addressData.address}
              </Text>
            </View>

            <View style={styles.rowDetails}>
              <Text style={styles.label}>Recipient Address: </Text>
              <Text style={styles.addressValue}>
                {recipient?.addressData.address}
              </Text>
            </View>
          </View>

          <View style={styles.fees}>
            <View style={styles.rowDetails}>
              <Text style={styles.label}>Total: </Text>
              <Text style={styles.value}>₱{deliveryFee}</Text>
            </View>

            <View style={styles.rowDetails}>
              <Text style={styles.label}>Delivery Fee: </Text>
              <Text style={styles.value}>₱{deliveryFee * 0.05}</Text>
            </View>
          </View>

          <Button
            buttonStyle={styles.actionButton}
            title="Close"
            titleStyle={[styles.labelStyle, {color: Colors.white}]}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    width: '90%',
    paddingVertical: '5%',
    alignSelf: 'center',
    marginTop: '20%',
  },

  fees: {
    marginTop: '5%',
  },
  deliveryDetails: {
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: '5%',
  },
  addressValue: {
    fontSize: RFValue(12),
    marginTop: '2%',
  },
  statuses: {
    marginTop: '5%',
    borderTopWidth: 1,
    borderColor: Colors.primary,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: '5%',
  },
  value: {
    fontSize: RFValue(12),
    marginLeft: '5%',
  },
  label: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
  },
  contextDetails: {
    marginTop: '5%',
    width: '100%',
  },
  rowDetails: {
    flexDirection: 'row',
    marginTop: RFValue(5),
    flexWrap: 'wrap',
    width: '100%',
  },
  statusText: {
    color: Colors.white,
    fontSize: RFValue(9),
    textTransform: 'uppercase',
  },
  statusContainer: {
    padding: '3%',
    backgroundColor: Colors.green,
    borderRadius: 10,
  },
  tracking_number: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: RFValue(15),
  },

  dateText: {
    color: Colors.lightGrey,
    fontSize: RFValue(10.5),
  },

  nameText: {
    fontSize: RFValue(12),
  },
  container: {
    height: deviceHeight * 0.12,
    width: '90%',
    backgroundColor: Colors.background,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E0E0E3',
    borderRadius: 20,
    alignSelf: 'center',
    padding: '5%',
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HistoryItem;
