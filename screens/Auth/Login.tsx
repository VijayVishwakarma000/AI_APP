import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CustomText from '../../components/CustomText';
import CustomButton from '../../assets/CustomButton';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../assets/variables/vars';
import { useUser } from '../../hooks/UserProvider';
const HEIGHT = Dimensions.get('screen').height;

type LoginData = {
  email: string;
  password: string;
};

const Login = ({route,navigation}) => {
   
  const { setUserData } = useUser();
  const [Data, setData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [loading, setloading] = useState(false);

  async function loginUser() {
    try {
      setloading(true);
      let createUser = await fetch('http://192.168.29.97:3000/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });
      let result = await createUser.json();
      console.log(result);
      setUserData(result.data);
      console.log(Data);
      setloading(false);
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  }

  return (
    <View style={styles.loingparent}>
      <View style={styles.header}>
        <CustomText size="text_large">LOGIN</CustomText>
      </View>
      <View style={styles.inputParent}>
        <CustomInput
          onchange={e => setData({ ...Data, email: e })}
          value={Data.email}
          title="Email"
        />
        <CustomInput
          secureTextEntry
          onchange={e => setData({ ...Data, password: e })}
          value={Data.password}
          title="Password"
        />
      </View>
      <CustomButton loading={loading} onclick={() => loginUser()}>Login</CustomButton>
      <CustomText
        style={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          textAlign: 'center',
        }}
        size="text_small"
      >
        Not registered yet?{' '}
        <Text onPress={()=>navigation.navigate("register")} style={{ textDecorationLine: 'underline', color: 'red' }}>
          Register
        </Text>
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  loingparent: {
    flex: 1,
    backgroundColor: COLORS.color_primary,
    padding: 15,
  },
  inputParent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT - 700,
    marginBottom: 50,
  },
});

export default Login;
