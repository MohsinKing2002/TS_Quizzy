import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Logo from "../../assets/logo.png";
import { useColorScheme } from "nativewind";

type Props = {};

const Navbar = (props: Props) => {
  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      className={`flex items-center justify-between flex-row py-2 px-3 bg-indigo-900`}
    >
      <View className="flex items-center flex-row">
        <Image className="h-5 w-5" source={Logo} alt="logo" />
        <Text className={`ml-1 text-lg font-extrabold italic text-sky-300`}>
          Quizzy
        </Text>
      </View>
      <TouchableOpacity className="p-2" onPress={toggleColorScheme}>
        <MaterialIcons
          name={`${colorScheme == "light" ? "dark-mode" : "light-mode"}`}
          size={24}
          color="rgb(125 211 252)"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
