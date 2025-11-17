import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';

// Definindo os tipos de dados que o componente espera
interface Treino {
  id: string;
  nome: string;
  foco: string;
}

interface HomeDashboardProps {
  userName?: string;
  treinosDaSemana: Treino[];
}

export function HomeDashboard({ userName, treinosDaSemana }: HomeDashboardProps) {
  // Função que renderiza cada item da lista de treinos
  const renderTreinoItem = ({ item }: { item: Treino }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemSubtitle}>{item.foco}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header de Boas-Vindas */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Olá, <Text style={styles.highlight}>{userName || 'Atleta'}</Text>!
          </Text>
        </View>

        {/* Card de Calorias (Exemplo) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo de Calorias</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Consumido hoje:</Text>
            <Text style={[styles.cardText, { fontWeight: 'bold' }]}>1250 kcal</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Refeição</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Treinos (Exemplo) */}
        <Text style={styles.listHeader}>Seus treinos da semana</Text>
        <FlatList
          data={treinosDaSemana}
          renderItem={renderTreinoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} 
        />
      </View>
    </ScrollView>
  );
}