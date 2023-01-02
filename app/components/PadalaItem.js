import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {deviceWidth, deviceHeight} from '../shared/utils/device.utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors, Themes} from '../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
function PadalaItem({item, onPress}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let shipmentData = JSON.parse(item?.shipmentData);
  let recipientData = JSON.parse(item?.recipientData);
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.orderNumber}>
          Padala ID: <Text style={{fontWeight: 'bold'}}>#41235</Text>
        </Text>

        <View style={styles.mainDetails}>
          <Text style={{marginBottom: '2%'}}>
            <Text style={{fontWeight: 'bold', marginRight: '2%'}}>
              Delivery Fee:
            </Text>
            ₱{item.deliveryFee.toFixed(2)}
          </Text>
          <Text style={styles.shipmentType}>
            <Text style={{fontWeight: 'bold', marginRight: '2%'}}>
              Shipment:
            </Text>
            {shipmentData?.type}
          </Text>
          <Text style={styles.shipmentSize}>{shipmentData?.size}</Text>
        </View>
      </View>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.fromToContainer}>
          <View style={styles.mapMarker}>
            <FontAwesome
              name="dot-circle-o"
              size={20}
              color={'#rgb(74,90,230)'}
            />
            <View style={styles.brokenLines} />
            <FontAwesome name="map-marker" size={25} color={Colors.primary} />
          </View>

          <View style={styles.locationDetails}>
            <View style={styles.personData}>
              <Text style={styles.locationText} numberOfLines={2}>
                {shipmentData?.addressData?.address}
              </Text>
              <Text style={styles.nameText}>{shipmentData?.name}</Text>
            </View>

            <Text style={styles.etaText}>24km away from pickup point</Text>

            <View style={styles.personData}>
              <Text style={styles.locationText} numberOfLines={2}>
                {recipientData?.addressData?.address}
              </Text>
              <Text style={styles.nameText}>{recipientData?.name}</Text>
            </View>
          </View>
        </View>
      </Collapsible>

      <View style={styles.actionsContainer}>
        <Button
          buttonStyle={[
            Themes.buttonPrimary,
            {
              backgroundColor: Colors.secondary,
              width: '90%',
              alignSelf: 'center',
            },
          ]}
          title={'Track Order'}
          titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
          containerStyle={{marginTop: '5%'}}
          icon={
            <MaterialCommunityIcons
              name="target"
              size={RFValue(24)}
              color="white"
            />
          }
          onPress={onPress}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  actionsContainer: {
    marginTop: '5%',
  },
  nameText: {
    marginTop: '5%',
    fontSize: RFValue(12),
  },
  mainDetails: {
    marginTop: '2%',
  },
  shipmentSize: {
    fontSize: RFValue(11),
    color: Colors.primary,
  },
  shipmentType: {
    textTransform: 'capitalize',
    fontSize: RFValue(13),
  },
  sender: {
    fontSize: RFValue(13),
    color: 'black',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: RFValue(13),
    color: 'black',
    marginTop: -RFValue(10),
    marginBottom: '2%',
  },
  detailsContainer: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingBottom: '5%',
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  statusText: {
    color: 'white',
    fontSize: RFValue(11),
    padding: 5,
    textTransform: 'uppercase',
  },
  statusBar: {
    backgroundColor: Colors.primary,
    width: RFValue(90),
    alignItems: 'center',
    paddingVertical: RFValue(5),
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: RFValue(10),
  },
  etaText: {
    fontSize: RFValue(10),
    width: '80%',
    color: '#F5C052',
  },
  locationText: {
    fontSize: RFValue(13),
    color: 'black',
    fontWeight: 'bold',
  },
  locationDetails: {
    justifyContent: 'space-between',
  },
  fromToContainer: {
    flexDirection: 'row',
    width: '50%',
    marginTop: '5%',
  },
  mapMarker: {
    alignItems: 'center',
    width: deviceWidth * 0.1,
  },
  brokenLines: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.lightGrey,
    height: deviceHeight * 0.2,
    borderRightWidth: 0,
    // marginLeft: 5,
  },
  container: {
    width: deviceWidth * 0.9,
    alignSelf: 'center',
    marginVertical: '5%',
    paddingHorizontal: '1%',
    paddingVertical: '5%',
    backgroundColor: 'white',
    elevation: 2,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    justifyContent: 'space-between',
    borderRadius: RFValue(10),
  },
});
export default PadalaItem;
