// components/CustomInput/styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  focusedInput: {
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});