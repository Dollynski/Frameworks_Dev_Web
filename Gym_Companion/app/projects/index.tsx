import { HomeDashboard } from '@/components/HomeDashboard';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Dados de exemplo (mock)
const mockTreinos = [
  { id: '1', nome: 'Dia 1', foco: 'Peito, Ombro e Tríceps', concluido: true }, // <--- JÁ FEZ!
  { id: '2', nome: 'Dia 2', foco: 'Costas e Bíceps', concluido: false },
  { id: '3', nome: 'Dia 3', foco: 'Pernas Completas', concluido: false },
  { id: '4', nome: 'Dia 4', foco: 'Cardio e Abdominais', concluido: false },
];

// ... resto do código

export default function ProjectsIndex() {
  const userName = 'Douglas'; 

  return (
    <DashboardLayout title="Início">
      <HomeDashboard 
        userName={userName} 
        treinosDaSemana={mockTreinos} 
      />
    </DashboardLayout>
  );
}