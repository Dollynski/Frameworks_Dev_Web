import { HomeDashboard } from '@/components/HomeDashboard';
import React from 'react';
// import { useAuth } from '@/hooks/useAuth'; // Futuramente, você pegará os dados do usuário logado

// Dados de exemplo (mock) para os treinos, já que não temos API
const mockTreinos = [
  { id: '1', nome: 'Treino A', foco: 'Peito, Ombro e Tríceps' },
  { id: '2', nome: 'Treino B', foco: 'Costas e Bíceps' },
  { id: '3', nome: 'Treino C', foco: 'Pernas Completas' },
];

export default function HomeScreen() {
  // const { user } = useAuth(); // Futuramente, você usaria algo assim

  // Para nossa demonstração:
  const userName = 'Douglas'; 

  return (
    <HomeDashboard 
      userName={userName} 
      treinosDaSemana={mockTreinos} 
    />
  );
}