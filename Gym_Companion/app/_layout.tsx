// app/_layout.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        // Aguarda o próximo frame para garantir que o navigator está montado
        const timeout = setTimeout(() => {
            setNavigationReady(true);
        }, 0);
        
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!navigationReady) return;
        
        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            // CORREÇÃO: Redireciona para o grupo (projects)
            router.replace('/projects');
        }
    }, [user, segments, navigationReady]);
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
  
  // Só executa a proteção de rota após o carregamento
  useProtectedRoute(isLoading ? null : auth?.user);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* CORREÇÃO: Declara o grupo (projects) */}
      <Stack.Screen name="(projects)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}