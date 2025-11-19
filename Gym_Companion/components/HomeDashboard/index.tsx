import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface Treino {
  id: string;
  nome: string;
  foco: string;
  concluido: boolean;
}

interface HomeDashboardProps {
  userName?: string;
  treinosDaSemana: Treino[];
}

export function HomeDashboard({ userName, treinosDaSemana }: HomeDashboardProps) {
  const [treinos, setTreinos] = useState<Treino[]>(treinosDaSemana);
  
  const [calorias, setCalorias] = useState(1250);
  const [metaCalorias] = useState(2500);
  const [agua, setAgua] = useState(2); // Copos de 250ml
  const [modalVisible, setModalVisible] = useState(false);
  const [novaRefeicao, setNovaRefeicao] = useState('');


  const toggleTreino = (id: string) => {
    setTreinos(listaAtual => 
      listaAtual.map(treino => 
        treino.id === id 
          ? { ...treino, concluido: !treino.concluido } // Inverte o valor boolean
          : treino
      )
    );
  };

  const handleSalvarRefeicao = () => {
    if (!novaRefeicao) return;
    setCalorias(calorias + 450); 
    setModalVisible(false);
    setNovaRefeicao('');
    Alert.alert("Sucesso", "Refeição registrada! (+450 kcal)");
  };

  const renderTreinoItem = ({ item }: { item: Treino }) => (
    <TouchableOpacity 
      style={[styles.itemContainer, item.concluido && styles.itemContainerDone]}
      onPress={() => toggleTreino(item.id)}
      activeOpacity={0.7}
    >
      <View>
        <Text style={[styles.itemName, item.concluido && styles.textDone]}>{item.nome}</Text>
        <Text style={styles.itemSubtitle}>{item.foco}</Text>
      </View>
      
      {/* Ícone muda dinamicamente */}
      <Ionicons 
        name={item.concluido ? "checkmark-circle" : "ellipse-outline"} 
        size={24} 
        color={item.concluido ? "#22c55e" : "#cbd5e1"} 
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        
        {/* Header Simples */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Olá, <Text style={styles.highlight}>{userName || 'Atleta'}</Text>!
          </Text>
          <Text style={styles.dateText}>Quarta-feira, 19 Nov</Text>
        </View>

        {/* --- CARD DE CALORIAS & MACROS --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo Diário</Text>
          
          <View style={styles.calorieRow}>
            <View>
                <Text style={styles.bigNumber}>{calorias}</Text>
                <Text style={styles.unitText}>kcal consumidas</Text>
            </View>
            <View style={styles.goalContainer}>
                <Text style={styles.goalText}>Meta: {metaCalorias}</Text>
                {/* Barra de progresso simples */}
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${Math.min((calorias/metaCalorias)*100, 100)}%` }]} />
                </View>
            </View>
          </View>

          {/* Macros (Dados Fictícios para Demo) */}
          <View style={styles.macrosContainer}>
             <MacroItem label="Proteína" value="120g" color="#3b82f6" />
             <MacroItem label="Carbo" value="210g" color="#eab308" />
             <MacroItem label="Gordura" value="55g" color="#ef4444" />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Adicionar Refeição</Text>
          </TouchableOpacity>
        </View>

        {/* --- CARD DE HIDRATAÇÃO --- */}
        <View style={styles.waterCard}>
            <View style={styles.waterInfo}>
                <Ionicons name="water" size={32} color="#3b82f6" />
                <View>
                    <Text style={styles.waterTitle}>Hidratação</Text>
                    <Text style={styles.waterSubtitle}>{agua * 250}ml / 3000ml</Text>
                </View>
            </View>
            <View style={styles.waterControls}>
                <TouchableOpacity onPress={() => setAgua(Math.max(0, agua - 1))} style={styles.waterBtn}>
                    <Ionicons name="remove" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <Text style={styles.waterCount}>{agua}</Text>
                <TouchableOpacity onPress={() => setAgua(agua + 1)} style={styles.waterBtn}>
                    <Ionicons name="add" size={20} color="#3b82f6" />
                </TouchableOpacity>
            </View>
        </View>

        {/* --- LISTA DE TREINOS --- */}
        <Text style={styles.listHeader}>Treinos da Semana</Text>
        <FlatList
          data={treinos}
          renderItem={renderTreinoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} 
        />
      </View>

      {/* --- MODAL ADICIONAR REFEIÇÃO --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>O que você comeu?</Text>
                <TextInput 
                    placeholder="Ex: Arroz com frango"
                    style={styles.modalInput}
                    value={novaRefeicao}
                    onChangeText={setNovaRefeicao}
                />
                <View style={styles.modalActions}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBtnCancel}>
                        <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSalvarRefeicao} style={styles.modalBtnSave}>
                        <Text style={styles.modalBtnTextSave}>Salvar (+450kcal)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

function MacroItem({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color }]}>{value}</Text>
            <Text style={styles.macroLabel}>{label}</Text>
            {/* Barra decorativa pequena */}
            <View style={{ 
                width: 40, 
                height: 4, 
                backgroundColor: color, 
                marginTop: 4, 
                borderRadius: 2, 
                opacity: 0.5 
            }} />
        </View>
    )
}