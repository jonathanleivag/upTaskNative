import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export const BotonLogout = () => {
  const { navigate } = useNavigation();
  const boton = async () => {
    await AsyncStorage.removeItem("@token");
    navigate("LoginView");
  };
  return (
    <AntDesign
      onPress={boton}
      name="logout"
      size={24}
      color="#fff"
      style={{ marginRight: 20 }}
    />
  );
};
