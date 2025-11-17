// app/projects/index.tsx

import { HomeDashboard } from '@/components/HomeDashboard';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Dados de exemplo (mock)
const mockTreinos = [
  { id: '1', nome: 'Treino A', foco: 'Peito, Ombro e Tríceps' },
  { id: '2', nome: 'Treino B', foco: 'Costas e Bíceps' },
  { id: '3', nome: 'Treino C', foco: 'Pernas Completas' },
  { id: '4', nome: 'Treino D', foco: 'Cardio e Abdominais' },
];

export default function ProjectsIndex() {
  const userName = 'Douglas'; 

  return (
    // Atualizamos o título para bater com a referência
    <DashboardLayout title="Início">
      <HomeDashboard 
        userName={userName} 
        treinosDaSemana={mockTreinos} 
      />
    </DashboardLayout>
  );
}