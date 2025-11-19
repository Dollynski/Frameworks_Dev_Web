import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  highlight: {
    color: '#3b82f6',
  },
  dateText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 4,
  },
  
  // --- CARD DE CALORIAS ---
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 40,
  },
  unitText: {
    color: '#64748b',
    fontSize: 14,
  },
  goalContainer: {
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: 20,
  },
  goalText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  
  // --- MACROS ---
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  macroLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },

  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // --- CARD DE ÁGUA ---
  waterCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  waterSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  waterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  waterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    minWidth: 20,
    textAlign: 'center',
  },

  // --- LISTA DE TREINOS ---
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemContainerDone: {
    opacity: 0.6,
    backgroundColor: '#f8fafc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },

  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#f8fafc',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalBtnCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalBtnTextCancel: {
    color: '#64748b',
    fontWeight: '600',
  },
  modalBtnSave: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalBtnTextSave: {
    color: 'white',
    fontWeight: '600',
  },
});