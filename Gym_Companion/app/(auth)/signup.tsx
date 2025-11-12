import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    // O 'Alert' não é mais necessário
    TextInput
} from 'react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // --- MUDANÇA AQUI ---
  // Removemos a validação e a lógica da API.
  // A função agora só navega para a tela principal.
  const handleSignUp = () => {
    // Usamos 'replace' para que o usuário não possa "voltar" para a tela de cadastro
    router.replace('/projects');
  };
  // --- FIM DA MUDANÇA ---

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
            <View style={styles.logoContainer}>
                <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.appName}>Gym Companion</Text>
            </View>

            <Text style={styles.title}>Crie sua conta</Text>
            
            <CustomInput
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <CustomInput
                ref={emailInputRef}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <CustomInput
                ref={passwordInputRef}
                placeholder="Crie uma senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
            />

            <CustomButton title="Cadastrar" onPress={handleSignUp} />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.linkText}>Faça Login</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// O StyleSheet permanece exatamente o mesmo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b82f6', 
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#4b5563',
  },
  linkText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});