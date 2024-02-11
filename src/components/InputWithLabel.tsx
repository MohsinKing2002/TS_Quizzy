import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const InputWithLabel = ({ label, value, onChangeText }: Props) => {
  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TextTheming = colorScheme == "light" ? "black" : "gray-200";

  return (
    <View>
      <Text className={`text-base font-bold pb-1 text-${TextTheming}`}>
        {label}
      </Text>
      <TextInput
        className={`p-2 border border-gray-300 rounded-lg text-${TextTheming}`}
        placeholder="hello"
        value={value}
        onChangeText={onChangeText}
      />
      {!value && (
        <Text className="pt-1 text-red-600">* Enter you name to start..</Text>
      )}
    </View>
  );
};

export default InputWithLabel;
