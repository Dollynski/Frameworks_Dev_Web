// app/_layout.tsx

import { router, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Criando um Contexto de Autenticação
const AuthContext = createContext<{ user: any; signOut: () => void; signIn: (token: string) => void } | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

// Provedor de Autenticação
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => setUser(token),
        signOut: () => {
          setUser(null);
          AsyncStorage.removeItem('client_key');
        },
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook que protege as rotas
function useProtectedRoute(user: any) {
    const segments = useSegments();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            // CORREÇÃO: Redireciona para o grupo (projects)
            router.replace('/projects');
        }
    }, [user, segments]);
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('client_key').then(token => {
      if (token && auth) {
        auth.signIn(token);
      }
      setIsLoading(false);
    });
  }, []);
  
  useProtectedRoute(auth?.user);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* CORREÇÃO: Declara o grupo (projects) */}
      <Stack.Screen name="(projects)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}