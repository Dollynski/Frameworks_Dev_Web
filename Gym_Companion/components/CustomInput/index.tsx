import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (event: any) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: any) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    return (
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isFocused && styles.focusedInput,
            style,
          ]}
          placeholderTextColor="#9ca3af"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
    );
  }
);