import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Ionicons } from '@expo/vector-icons';

// --- TIPOS ---
type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
};

type DayPlan = {
  id: string;
  dayName: string;
  workoutName: string;
  focus: string;
  restDay: boolean;
  exercises: Exercise[]; // Lista de exercícios do dia
};

// --- DADOS INICIAIS ---
const initialWeek: DayPlan[] = [
  { id: '1', dayName: 'Segunda', workoutName: 'Treino A', focus: 'Peito e Tríceps', restDay: false, exercises: [] },
  { id: '2', dayName: 'Terça', workoutName: 'Treino B', focus: 'Costas e Bíceps', restDay: false, exercises: [] },
  { id: '3', dayName: 'Quarta', workoutName: 'Descanso', focus: 'Recuperação', restDay: true, exercises: [] },
  { id: '4', dayName: 'Quinta', workoutName: 'Treino C', focus: 'Pernas', restDay: false, exercises: [] },
  { id: '5', dayName: 'Sexta', workoutName: 'Treino D', focus: 'Ombros e Trapézio', restDay: false, exercises: [] },
  { id: '6', dayName: 'Sábado', workoutName: 'Cardio', focus: 'Corrida 5km', restDay: false, exercises: [] },
  { id: '7', dayName: 'Domingo', workoutName: 'Descanso', focus: 'Total', restDay: true, exercises: [] },
];

export default function AgendaScreen() {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(initialWeek);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
  
  // Estados do Resumo
  const [editWorkout, setEditWorkout] = useState('');
  const [editFocus, setEditFocus] = useState('');
  const [isRestDay, setIsRestDay] = useState(false);

  // Estados para Adicionar Exercício
  const [exName, setExName] = useState('');
  const [exSets, setExSets] = useState('');
  const [exReps, setExReps] = useState('');
  const [exWeight, setExWeight] = useState('');
  
  // Lista temporária de exercícios no modal
  const [tempExercises, setTempExercises] = useState<Exercise[]>([]);

  // Abrir modal
  const handleEditDay = (day: DayPlan) => {
    setSelectedDay(day);
    setEditWorkout(day.workoutName);
    setEditFocus(day.focus);
    setIsRestDay(day.restDay);
    setTempExercises(day.exercises || []); // Carrega exercícios existentes
    setModalVisible(true);
  };

  // Adicionar exercício à lista temporária
  const addExercise = () => {
    if (!exName || !exSets || !exReps) {
        Alert.alert("Ops!", "Preencha pelo menos Nome, Séries e Repetições.");
        return;
    }

    const newExercise: Exercise = {
        id: Date.now().toString(),
        name: exName,
        sets: exSets,
        reps: exReps,
        weight: exWeight || '0'
    };

    setTempExercises([...tempExercises, newExercise]);
    // Limpar inputs
    setExName('');
    setExSets('');
    setExReps('');
    setExWeight('');
  };

  // Remover exercício da lista
  const removeExercise = (id: string) => {
    setTempExercises(tempExercises.filter(ex => ex.id !== id));
  };

  // Salvar tudo no dia
  const handleSave = () => {
    if (!selectedDay) return;

    const updatedWeek = weekPlan.map(day => {
      if (day.id === selectedDay.id) {
        return {
          ...day,
          workoutName: isRestDay ? 'Descanso' : editWorkout,
          focus: isRestDay ? '-' : editFocus,
          restDay: isRestDay,
          exercises: isRestDay ? [] : tempExercises // Salva a lista de exercícios
        };
      }
      return day;
    });

    setWeekPlan(updatedWeek);
    setModalVisible(false);
  };

  const renderDayCard = ({ item }: { item: DayPlan }) => (
    <TouchableOpacity 
      style={[styles.dayCard, item.restDay && styles.restDayCard]} 
      onPress={() => handleEditDay(item)}
    >
      <View style={styles.dayHeader}>
        <Text style={styles.dayName}>{item.dayName}</Text>
        {item.restDay ? (
           <Ionicons name="bed-outline" size={20} color="#94a3b8" />
        ) : (
           <Ionicons name="barbell-outline" size={20} color="#3b82f6" />
        )}
      </View>
      
      <View style={styles.dayContent}>
        <Text style={[styles.workoutTitle, item.restDay && styles.restText]} numberOfLines={1}>
            {item.workoutName || 'Definir Treino'}
        </Text>
        
        {/* Mostra resumo visual: quantidade de exercícios */}
        {!item.restDay && item.exercises.length > 0 && (
            <View style={styles.exerciseBadge}>
                <Ionicons name="list" size={12} color="#64748b" />
                <Text style={styles.badgeText}>{item.exercises.length} exercícios</Text>
            </View>
        )}

        <Text style={styles.focusText} numberOfLines={1}>{item.focus}</Text>
      </View>

      <View style={styles.editHint}>
        <Text style={styles.editText}>Editar Detalhes</Text>
        <Ionicons name="pencil-sharp" size={12} color="#3b82f6" />
      </View>
    </TouchableOpacity>
  );

  return (
    <DashboardLayout title="Agenda Semanal">
      <View style={styles.container}>
        <Text style={styles.subtitle}>Planeje sua rotina de treinos</Text>
        
        <FlatList 
            data={weekPlan}
            renderItem={renderDayCard}
            keyExtractor={item => item.id}
            numColumns={2} 
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
        />

        {/* --- MODAL DE EDIÇÃO --- */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedDay?.dayName}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#64748b" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* ScrollView para o conteúdo do modal, pois pode ficar grande */}
                    <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: '80%' }}>
                        
                        {/* Checkbox Descanso */}
                        <TouchableOpacity 
                            style={styles.checkboxContainer} 
                            onPress={() => setIsRestDay(!isRestDay)}
                        >
                            <Ionicons 
                                name={isRestDay ? "checkbox" : "square-outline"} 
                                size={24} 
                                color="#3b82f6" 
                            />
                            <Text style={styles.checkboxLabel}>Dia de Descanso</Text>
                        </TouchableOpacity>

                        {!isRestDay && (
                            <>
                                {/* Seção de Resumo */}
                                <Text style={styles.sectionLabel}>Resumo do Treino</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={editWorkout}
                                    onChangeText={setEditWorkout}
                                    placeholder="Nome (ex: Treino A)"
                                />
                                <TextInput 
                                    style={styles.input}
                                    value={editFocus}
                                    onChangeText={setEditFocus}
                                    placeholder="Foco (ex: Peito)"
                                />

                                <View style={styles.divider} />

                                {/* Seção de Exercícios */}
                                <Text style={styles.sectionLabel}>Adicionar Exercícios</Text>
                                
                                {/* Inputs para novo exercício */}
                                <View style={styles.addExerciseRow}>
                                    <View style={{ flex: 2 }}>
                                        <Text style={styles.miniLabel}>Exercício</Text>
                                        <TextInput style={styles.miniInput} value={exName} onChangeText={setExName} placeholder="Supino" />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.miniLabel}>Séries</Text>
                                        <TextInput style={styles.miniInput} value={exSets} onChangeText={setExSets} keyboardType="numeric" placeholder="4" />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.miniLabel}>Reps</Text>
                                        <TextInput style={styles.miniInput} value={exReps} onChangeText={setExReps} keyboardType="numeric" placeholder="12" />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.miniLabel}>Kg</Text>
                                        <TextInput style={styles.miniInput} value={exWeight} onChangeText={setExWeight} keyboardType="numeric" placeholder="20" />
                                    </View>
                                    <TouchableOpacity style={styles.addBtn} onPress={addExercise}>
                                        <Ionicons name="add" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>

                                {/* Lista de Exercícios Adicionados */}
                                <View style={styles.exercisesList}>
                                    {tempExercises.length === 0 && (
                                        <Text style={styles.emptyText}>Nenhum exercício adicionado.</Text>
                                    )}
                                    {tempExercises.map((ex, index) => (
                                        <View key={ex.id} style={styles.exerciseItem}>
                                            <View style={styles.exerciseInfo}>
                                                <Text style={styles.exName}>{index + 1}. {ex.name}</Text>
                                                <Text style={styles.exDetails}>{ex.sets} x {ex.reps} • {ex.weight}kg</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => removeExercise(ex.id)}>
                                                <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}
                    </ScrollView>

                    <View style={styles.modalActions}>
                        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                            <Text style={styles.saveText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

      </View>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 20 },
  row: { justifyContent: 'space-between', gap: 16 },
  
  // --- CARD DO DIA ---
  dayCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: '47%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  restDayCard: { backgroundColor: '#f8fafc', borderColor: '#e2e8f0', opacity: 0.8 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 8 },
  dayName: { fontSize: 16, fontWeight: 'bold', color: '#334155' },
  dayContent: { minHeight: 50 },
  workoutTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  restText: { color: '#94a3b8', fontStyle: 'italic' },
  focusText: { fontSize: 14, color: '#64748b' },
  exerciseBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4, backgroundColor: '#f1f5f9', alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, color: '#64748b', fontWeight: '600' },
  editHint: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10, gap: 4 },
  editText: { fontSize: 12, color: '#3b82f6', fontWeight: '600' },

  // --- MODAL ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', width: '100%', maxWidth: 500, maxHeight: '90%', borderRadius: 16, padding: 24, elevation: 5 },
  
  // Header do Modal
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  
  // Conteúdo do Modal
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#334155', marginTop: 10, marginBottom: 8, textTransform: 'uppercase' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12, backgroundColor: '#fff' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 },
  
  // Checkbox
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  checkboxLabel: { fontSize: 16, color: '#334155' },

  // Formulário de Adicionar Exercício
  addExerciseRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end', marginBottom: 16 },
  miniLabel: { fontSize: 10, color: '#64748b', marginBottom: 4, fontWeight: '600' },
  miniInput: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, padding: 8, fontSize: 14, backgroundColor: '#fff', height: 40 },
  addBtn: { backgroundColor: '#3b82f6', width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  
  // Lista de Exercícios
  exercisesList: { backgroundColor: '#f8fafc', borderRadius: 8, padding: 12, minHeight: 100 },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  exerciseItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  exerciseInfo: { flex: 1 },
  exName: { fontWeight: '600', color: '#0f172a', fontSize: 14 },
  exDetails: { color: '#64748b', fontSize: 12 },

  // Footer do Modal
  modalActions: { marginTop: 20 },
  saveBtn: { backgroundColor: '#3b82f6', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  saveText: { color: 'white', fontWeight: '700', fontSize: 16 },
});