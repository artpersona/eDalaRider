/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Themes} from '../shared/layouts';
import {Button} from 'react-native-elements';
function CustomModal({
  isVisible,
  onClose,
  children,
  header,
  showConfirmButton = true,
  showCancelButton = false,
  onConfirm,
  onCancel,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  loading,
  confirmButtonColor = Colors.primary,
  cancelButtonColor = Colors.red,
  title,
  closeVisible = true,
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      useNativeDriver={true}
      animationIn={'zoomInDown'}
      animationOut={'zoomOutUp'}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropOpacity={0.7}
      backdropColor={Colors.backDrop}>
      <View style={styles.modal__content}>
        {header ? (
          header
        ) : closeVisible ? (
          <View style={styles.header__container}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign
                name="closecircleo"
                size={RFValue(30)}
                color={Colors.red}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {title && <Text style={styles.titleText}>{title}</Text>}

        {children && children}

        {(showConfirmButton || showCancelButton) && (
          <View style={styles.footer}>
            {showConfirmButton && (
              <Button
                buttonStyle={[
                  Themes.buttonModal,

                  {
                    backgroundColor: confirmButtonColor,
                    width: showCancelButton ? '80%' : '100%',
                    alignSelf: 'center',
                  },
                ]}
                title={confirmButtonText}
                titleStyle={Themes.buttonTextPrimary}
                onPress={
                  onConfirm || console.log('Attach function to this button')
                }
                loading={loading}
              />
            )}
            {showCancelButton && (
              <Button
                buttonStyle={[
                  Themes.buttonModal,
                  {
                    backgroundColor: cancelButtonColor,
                    width: showConfirmButton ? '80%' : '90%',
                    alignSelf: 'center',
                  },
                ]}
                title={cancelButtonText}
                titleStyle={Themes.buttonTextPrimary}
                onPress={onCancel || onClose}
                loading={loading}
              />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  header__container: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  close: {
    marginTop: RFValue(-10),
  },
  modal__content: {
    backgroundColor: 'white',
    padding: RFValue(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(8),
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  footer: {
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: RFValue(17),
    textTransform: 'capitalize',
    color: Colors.primary,
  },
});

export default CustomModal;
