import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  ActionSheetIOS,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CongratsImage from "../../assets/congrats.png";
import Avatar from "../../assets/avatar.png";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AnswerProps } from "../../App";

type BoxProps = {
  cn?: string;
  colorScheme: string;
  TextTheming: string;
  icon: string;
  title: string;
  value: number;
};

type Props = {
  name: string;
  AnwersObject: AnswerProps[];
  StartAgain: () => void;
};

const ResultBox = ({
  colorScheme,
  cn,
  TextTheming,
  icon,
  title,
  value,
}: BoxProps) => {
  return (
    <View
      className={`flex items-center justify-between flex-row w-36 border border-gray-400 py-2 px-3 rounded-lg ${cn}`}
    >
      <AntDesign
        name={icon}
        size={32}
        color={colorScheme == "light" ? "black" : "#DEDEDE"}
      />

      <View>
        <Text className={`text-sm text-${TextTheming}`}>{title}</Text>
        <Text className={`text-xl font-extrabold text-${TextTheming}`}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const Analytics = ({ name, AnwersObject, StartAgain }: Props) => {
  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const BgTheming = colorScheme == "light" ? "white" : "slate-700";
  const TextTheming = colorScheme == "light" ? "black" : "gray-200";

  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalInCorrect, setTotalInCorrect] = useState<number>(0);

  //   console.log(totalCorrect, totalInCorrect);

  /************************ calculating quiz data *****************************/
  useEffect(() => {
    let cr = 0,
      incr = 0;
    AnwersObject.forEach((item, index) => {
      if (item.correct) cr++;
      else incr++;
    });
    setTotalCorrect(cr);
    setTotalInCorrect(incr);
  }, [AnwersObject]);

  return (
    <View className={` min-h-[80vh] flex space-y-8`}>
      {/************************ Result card *****************************/}
      <View className={`p-4 rounded-lg flex space-y-2 bg-${BgTheming}`}>
        <Image
          className="h-28 w-28 m-auto"
          source={Avatar}
          alt="illustration"
        />
        <Text
          className={`text-xl text-center font-bold pb-1 text-${TextTheming}`}
        >
          {name}
        </Text>

        <View className="pt-3 pb-2 flex flex-row justify-between">
          <ResultBox
            colorScheme={colorScheme}
            TextTheming={TextTheming}
            icon="checkcircleo"
            title="Correct"
            value={totalCorrect}
          />
          <ResultBox
            colorScheme={colorScheme}
            TextTheming={TextTheming}
            icon="closecircleo"
            title="Incorrect"
            value={totalInCorrect}
          />
        </View>
        <ResultBox
          cn="w-56 mx-auto mb-2"
          colorScheme={colorScheme}
          TextTheming={TextTheming}
          icon="pluscircleo"
          title="Attemped"
          value={AnwersObject.length}
        />

        {/************************ next question button *****************************/}
        <TouchableOpacity
          onPress={StartAgain}
          className={`p-3 flex flex-row items-center justify-center w-40 mx-auto bg-sky-200 rounded-lg`}
        >
          <Text className="text-base mr-2">Play Again</Text>
          <Feather name="arrow-right-circle" size={18} color="indigo" />
        </TouchableOpacity>
      </View>
      {/************************ Illustration *****************************/}
      <Image
        className="h-60 w-60 m-auto"
        source={CongratsImage}
        alt="illustration"
      />
    </View>
  );
};

export default Analytics;
