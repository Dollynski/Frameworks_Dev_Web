import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '@/app/_layout';
import { router, usePathname } from 'expo-router'; // Adicionado usePathname

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title = "Início" }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const pathname = usePathname(); // Hook para pegar a rota atual

  const handleLogout = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  // Função para verificar se o botão deve estar "Ativo" (Azul)
  const isActive = (routeKey: string) => {
    return pathname.includes(routeKey);
  };

  return (
    <View style={styles.container}>
      
      {/* --- SIDEBAR ESCURA --- */}
      <View style={styles.sidebar}>
        
        {/* Logo Centralizado */}
        <View style={styles.sidebarLogoContainer}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Menu de Navegação */}
        <View style={styles.menuContainer}>
            <MenuItem 
                icon="home-outline" 
                label="Início" 
                active={isActive('projects')} 
                onPress={() => router.push('/projects')}
            />
            <MenuItem 
                icon="calendar-outline" 
                label="Agenda" 
                active={isActive('agenda')}
                onPress={() => router.push('/agenda')}
            />
        </View>
        
        {/* Botão de Logoff */}
        <View style={styles.logoutContainer}>
             <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#fff" />
                <Text style={styles.menuItemText}>Fazer logoff</Text>
            </TouchableOpacity>
        </View>

        {/* Footer Pequeno */}
        <View style={styles.sidebarFooter}>
            <Text style={styles.footerLink}>Privacidade</Text>
            <Text style={styles.footerLink}>Termos</Text>
        </View>
      </View>

      {/* --- ÁREA DE CONTEÚDO --- */}
      <View style={styles.mainContent}>
        
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Conteúdo Rolável */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {children}
        </ScrollView>

      </View>
    </View>
  );
}

// Componente para os itens do menu (Atualizado com onPress)
function MenuItem({ icon, label, active = false, onPress }: { icon: any, label: string, active?: boolean, onPress?: () => void }) {
    return (
        <TouchableOpacity 
            style={[styles.menuItem, active && styles.menuItemActive]} 
            onPress={onPress}
        >
            <Ionicons name={icon} size={22} color="#fff" />
            <Text style={[styles.menuItemText, active && styles.menuItemTextActive]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
  },
  
  // --- ESTILOS DA SIDEBAR ---
  sidebar: {
    width: 250,
    backgroundColor: '#1F1F1F',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarLogoContainer: {
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginBottom: 40, 
  },
  logo: {
    width: 80, 
    height: 80,
    tintColor: '#fff',
  },
  
  menuContainer: {
    flex: 1,
  },
  logoutContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  sidebarFooter: {
    paddingHorizontal: 20,
    opacity: 0.5,
  },
  footerLink: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 4,
  },

  // --- ESTILOS DOS ITENS DE MENU ---
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, 
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: '#0077C8',
    borderLeftWidth: 4,
    borderLeftColor: '#005a9e',
  },
  menuItemText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '400',
  },
  menuItemTextActive: {
    fontWeight: '700',
  },

  // --- ESTILOS DA ÁREA PRINCIPAL ---
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 30,
  },
});