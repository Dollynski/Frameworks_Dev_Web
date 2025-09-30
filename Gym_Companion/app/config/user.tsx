import { Text, View } from "react-native";

export default function ConfigUserScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20 }}>
        Tela de Configurações do Usuário
      </Text>
    </View>
  );
}