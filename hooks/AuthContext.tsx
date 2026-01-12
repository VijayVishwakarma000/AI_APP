import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import { useUser } from './UserProvider';

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const { Authenticated } = useUser();

  const Stack = createStackNavigator();
  function StackScreens() {
    return (
      <>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name={'register'} options={{headerShown:false}}  component={Register} />
          <Stack.Screen name={'login'} options={{headerShown:false}} component={Login} />
        </Stack.Navigator>
      </>
    );
  }

  return !Authenticated ? children : <StackScreens />
};

export default AuthContext;
