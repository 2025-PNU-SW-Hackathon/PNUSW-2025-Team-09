import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}> {label}</Text>
      <TextInput
        {...props}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 8,
        }}
      />
    </View>
  );
};
