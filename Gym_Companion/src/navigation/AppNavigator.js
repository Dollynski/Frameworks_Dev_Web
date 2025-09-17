import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

function AppNavigator() {
  const { user } = useContext(AuthContext);

  // Aqui você pode adicionar um estado de loading
  // para esperar a verificação inicial do usuário

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}