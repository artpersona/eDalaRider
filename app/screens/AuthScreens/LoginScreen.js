import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomHeader, CustomInput} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {deviceHeight} from '../../shared/utils/device.utility';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../shared/utils/helpers.utility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthContext} from '../../shared/contexts/AuthContext';

function Login({navigation}) {
  const {login} = useAuthContext();
  // States
  const [icon, setIcon] = useState('eye-off-outline');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  // End States
  //  Library Hooks
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  //  End Library Hooks

  // Functions
  const iconChange = () => {
    setHidePassword(hidePassword => !hidePassword);
    setIcon(icon =>
      icon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline',
    );
  };

  const handleLogin = data => {
    setLoading(true);
    login(data?.email, data?.password)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <>
      <CustomHeader title="Rider App" />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.detailsContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subText}>Sign in to continue</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <CustomInput
                placeholder="E-MAIL"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.email
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="email"
                errorMessage={errors.email?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Invalid email format',
                  },
                }}
                errorStyle={styles.errorStyle}
                leftIcon={
                  <Ionicons name="mail-outline" size={26} color="black" />
                }
              />

              <CustomInput
                placeholder="PASSWORD"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.password
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                secureTextEntry={hidePassword}
                errorMessage={errors.password?.message}
                control={control}
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
                containerStyle={styles.containerStyle}
                errorStyle={styles.errorStyle}
                leftIcon={
                  <Ionicons
                    name="lock-closed-outline"
                    size={26}
                    color="black"
                  />
                }
                rightIcon={
                  <MaterialCommunityIcons
                    name={icon}
                    size={25}
                    color={'black'}
                    onPress={iconChange}
                  />
                }
              />
            </View>

            <View style={styles.formUtils}>
              <Text style={styles.forgotText}>Forgot Password ?</Text>
            </View>

            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {backgroundColor: Colors.primary, width: '100%'},
              ]}
              title={'Sign in'}
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
              containerStyle={{marginTop: '5%'}}
              onPress={handleSubmit(handleLogin)}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formUtils: {
    marginBottom: '2%',
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  placeholder__text: {
    color: 'black',
    fontSize: RFValue(12),
  },
  subText: {
    fontSize: RFValue(16),
    color: Colors.grey,
    marginTop: '2%',
  },
  welcomeText: {
    fontSize: RFValue(20),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  containerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    backgroundColor: Colors.background,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    paddingVertical: 0,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  detailsContainer: {
    marginBottom: '7%',
  },
  contentContainer: {
    backgroundColor: Colors.white,
    padding: '5%',
    paddingVertical: '10%',
    elevation: 2,
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: deviceHeight * 0.13,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default Login;
