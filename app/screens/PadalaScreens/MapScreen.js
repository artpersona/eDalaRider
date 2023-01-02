import React, {useState, useEffect, useRef} from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, AnimatedRegion, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../shared/layouts';
import {RFValue} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import {deviceHeight} from '../../shared/utils/device.utility';
import {Button} from 'react-native-elements';
import {showLocation} from 'react-native-map-link';
import {CustomModal} from '../../components';
import {usePadalaContext} from '../../shared/contexts/PadalaContext';

export default function MapScreen({route, navigation}) {
  const mapRef = useRef();
  const {item} = route?.params;
  const {changePadalaStatus} = usePadalaContext();

  let shipmentData = JSON.parse(item?.shipmentData);
  let recipientData = JSON.parse(item?.recipientData);

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transitionLoading, setTransitionLoading] = useState(false);
  const [parcelModal, setParcelModal] = useState(false);
  const [deliveredModal, setDeliveredModal] = useState(false);
  const [status, setStatus] = useState('pickup');
  const [destinationCoords, setDestinationCoords] = useState({
    latitude: 7.048546,
    longitude: 125.588695,
  });
  const recipientCoords = {
    latitude: 7.0687,
    longitude: 125.6013,
  };

  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted === PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.watchPosition(
          location => {
            console.log('coords are: ', location.coords);
            // setInitialLocation({
            //   latitude: location.coords.latitude,
            //   longitude: location.coords.longitude,
            // });
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          },
          error => alert(error.message),
          Platform.OS === 'android'
            ? {}
            : {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (!location) return;
  }, [location]);

  const showRoute = () => {
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  };

  const onPress = () => {
    setTransitionLoading(true);
    setParcelModal(false);

    changePadalaStatus(item?.id, 'in-transit').then(data => {
      setStatus('delivery');
      setTransitionLoading(false);
      setDestinationCoords(recipientCoords);
    });
  };

  const handleDelivered = () => {
    setTransitionLoading(true);

    changePadalaStatus(item?.id, 'delivered').then(data => {
      setTransitionLoading(false);

      setDeliveredModal(false);
      navigation.navigate('SuccessDelivery');
    });
  };

  const jumpBack = () => {
    mapRef.current.animateToRegion({
      latitude: 7.159,
      longitude: 125.5986,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const locationShow = () => {
    showLocation({
      latitude: destinationCoords.latitude,
      longitude: destinationCoords.longitude,
      sourceLatitude: location.latitude, // optionally specify starting location for directions
      sourceLongitude: location.longitude, // not optional if sourceLatitude is specified
      googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
      googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58', // optionally specify the google-place-id
      alwaysIncludeGoogle: false, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
      dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
      cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
      appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
      // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
      app: 'waze', // optionally specify specific app to use
      directionsMode: 'car', // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
    });
  };

  if (!location) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: Colors.primary,
          zIndex: 10,
          padding: 6,
        }}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 2,
            opacity: 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}

      <MapView.Animated
        showUserLocation={true}
        ref={mapRef}
        style={{flex: 1, marginBottom: -10}}
        mapType="standard"
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onMapReady={showRoute}>
        {location && (
          <MapViewDirections
            origin={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            destination={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
            apikey={'AIzaSyC1lqskLrwjsWCxvvAoe3kVpRzX3fvbNjE'}
            strokeWidth={3}
            strokeColor="#2A73DA"
            onReady={() => setLoading(false)}
          />
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Origin"
            description="Origin"
            identifier="origin"
            style={{
              overflow: 'visible',
              bottom: -40,
            }}>
            <View
              style={{
                width: RFValue(50),
                height: RFValue(50),
                bottom: -10,
              }}>
              <LottieView
                source={require('../../assets/animations/searching.json')}
                autoPlay
                loop
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </View>
          </Marker>
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
            title="Destination"
            description="Destination"
            identifier="destination"
          />
        )}
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={100}
          fillColor="rgba(0, 0, 255, 0.1)"
          strokeColor="blue"
        />
      </MapView.Animated>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 60 / 2,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={locationShow}
          activeOpacity={0.4}>
          <MaterialIcons name="my-location" size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 60 / 2,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}
          onPress={showRoute}
          activeOpacity={0.4}>
          <MaterialIcons name="zoom-out-map" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        {transitionLoading ? (
          <ActivityIndicator
            size="large"
            color={'black'}
            style={{alignSelf: 'center', marginTop: '20%'}}
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {status === 'delivery' ? 'Parcel Delivery' : 'Shipment Pickup'}
              </Text>
            </View>

            <View style={styles.infoDetails}>
              <View style={styles.shippersDetail}>
                <Text style={styles.name}>
                  {status === 'delivery'
                    ? shipmentData.name
                    : recipientData.name}
                </Text>
                <Text style={styles.role}>
                  {status === 'delivery' ? 'Recipient' : 'Shipper'}
                </Text>
              </View>
              <View style={styles.communicationActions}>
                <TouchableOpacity style={styles.communicationButton}>
                  <MaterialIcons name="call" size={24} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.communicationButton}>
                  <MaterialIcons
                    name="message"
                    size={24}
                    color={Colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.whiteContainer}>
              <Text style={styles.address}>
                {status === 'delivery'
                  ? shipmentData?.address?.address
                  : recipientData?.address?.address}
              </Text>
              <View style={styles.notesContainer}>
                <Text style={styles.notes}>Notes:</Text>
                <Text style={styles.notesValue}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Button
                buttonStyle={
                  status === 'delivery'
                    ? styles.actionButton
                    : [styles.actionButton, {alignSelf: 'center'}]
                }
                title={
                  status === 'delivery' ? 'Parcel Delivered' : 'Parcel Pickup'
                }
                titleStyle={[styles.labelStyle, {color: Colors.white}]}
                containerStyle={
                  status === 'delivery'
                    ? {
                        width: '60%',
                        alignSelf: 'center',
                      }
                    : {
                        width: '90%',
                        alignSelf: 'center',
                      }
                }
                onPress={
                  status === 'delivery'
                    ? () => setDeliveredModal(true)
                    : () => setParcelModal(true)
                }
              />

              {status === 'delivery' && (
                <Button
                  buttonStyle={styles.actionButton}
                  title={'Paid?'}
                  titleStyle={[styles.labelStyle, {color: Colors.white}]}
                  containerStyle={{
                    width: '30%',
                    alignSelf: 'center',
                  }}
                  onPress={
                    status === 'delivery'
                      ? () => setDeliveredModal(true)
                      : () => setParcelModal(true)
                  }
                  disabled={true}
                />
              )}
            </View>
          </>
        )}
      </View>

      <CustomModal
        isVisible={parcelModal}
        title="Confirm Parcel Pickup"
        showCancelButton={true}
        onCancel={() => setParcelModal(false)}
        onConfirm={onPress}
        closeVisible={false}>
        <Text style={styles.confirmText}>
          Are you sure you want to pickup this parcel?
        </Text>
      </CustomModal>

      <CustomModal
        isVisible={deliveredModal}
        title="Parcel Delivered?"
        showCancelButton={true}
        onCancel={() => setDeliveredModal(false)}
        onConfirm={handleDelivered}
        closeVisible={false}>
        <Text style={styles.confirmText}>Is the parcel already delivered?</Text>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    width: '92%',
    marginHorizontal: RFValue(15),
    justifyContent: 'center',
  },
  confirmText: {
    fontSize: RFValue(12),
    textAlign: 'center',
    marginTop: '5%',
  },
  actionButton: {
    backgroundColor: Colors.primary,
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: '5%',
    minHeight: RFValue(60),
    alignItems: 'center',
    marginHorizontal: RFValue(5),
  },

  notesValue: {
    fontSize: RFValue(11.5),
  },
  notes: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
  address: {
    fontSize: RFValue(14),
    color: 'black',
    fontWeight: 'bold',
  },
  notesContainer: {
    marginTop: RFValue(5),
  },
  whiteContainer: {
    marginHorizontal: RFValue(10),
    backgroundColor: Colors.white,
    elevation: 1,
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    padding: RFValue(10),
  },
  role: {
    textAlign: 'center',
    fontSize: RFValue(12),
    color: Colors.grey,
  },
  name: {
    fontSize: RFValue(18),
    color: Colors.primary,
  },
  communicationButton: {
    height: 40,
    width: 40,
    backgroundColor: Colors.primary,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFValue(10),
  },
  communicationActions: {
    flexDirection: 'row',
  },
  infoDetails: {
    marginHorizontal: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  headerText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: Colors.primary,
  },
  header: {
    paddingVertical: '3%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'whitesmoke',
  },
  infoContainer: {
    backgroundColor: '#F9F9FF',
    height: deviceHeight * 0.4,
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    elevation: 2,
  },
  actionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: deviceHeight * 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
