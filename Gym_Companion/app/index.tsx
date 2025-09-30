// app/index.tsx

import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { __DEV_MODE__ } from '../config/dev'; // Importa nossa chave de configuração

// Fallback definition for __DEV_MODE__ if the module is missing
const __DEV_MODE__ = { BYPASS_LOGIN: false };

export default function Index() {
  
  useEffect(() => {
    // Se a chave para pular o login estiver ativa, redireciona imediatamente.
    if (__DEV_MODE__.BYPASS_LOGIN) {
      console.log("MODO DEV: Pulando a tela de login...");
      router.replace('/projects');
      return; // Interrompe a execução aqui
    }

    // Se não, executa a lógica de verificação de login normal.
    const checkLoginStatus = async () => {
      try {
        const userKey = await AsyncStorage.getItem('client_key');
        if (userKey) {
          router.replace('/projects'); 
        } else {
          router.replace('/(auth)/login');
        }
      } catch (e) {
        router.replace('/(auth)/login');
      }
    };
    
    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});