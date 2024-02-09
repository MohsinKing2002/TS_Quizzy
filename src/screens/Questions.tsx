import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AnswerProps } from "../../App";
import { useColorScheme } from "nativewind";

type Props = {
  number: number;
  question: string;
  answers: string[];
  checkAnwer: (answer: string) => void;
  userAnswer: AnswerProps | undefined;
  nextQuestion: (e: any) => void;
};

const Questions = ({
  number,
  question,
  answers,
  checkAnwer,
  userAnswer,
  nextQuestion,
}: Props) => {
  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const BgTheming = colorScheme == "light" ? "white" : "slate-700";
  const TextTheming = colorScheme == "light" ? "black" : "gray-200";

  return (
    <View
      className={`p-5 bg-${BgTheming} min-h-[80vh] rounded-lg flex space-y-8`}
    >
      {/************************ question *****************************/}
      <Text
        className={`flex flex-row items-center font-bold text-lg text-${TextTheming}`}
      >
        {number}. <Text className=" font-medium">{question}</Text>
      </Text>
      {/************************ answer options *****************************/}
      <View className="flex space-y-4">
        {answers.map((answer, index) => (
          <TouchableOpacity
            disabled={userAnswer ? true : false}
            key={index}
            onPress={() => checkAnwer(answer)}
            className={`flex flex-row items-center p-2 border border-gray-200 rounded-lg ${
              userAnswer?.user_answer == answer &&
              !userAnswer.correct &&
              "bg-red-500"
            }`}
          >
            <Fontisto
              name={`${
                userAnswer?.correct_answer == answer
                  ? "radio-btn-active"
                  : "radio-btn-passive"
              }`}
              size={18}
              color={colorScheme == "light" ? "indigo" : "#DEDEDE"}
            />
            {/* <Fontisto name="radio-btn-active" size={18} color="indigo" /> */}
            <Text
              className={`ml-2 text-base font-medium tracking-wider text-${TextTheming}`}
            >
              {index + 1}. {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/************************ next question button *****************************/}
      <View className="pt-6 inline-flex items-end">
        <TouchableOpacity
          onPress={nextQuestion}
          className={`p-2 flex flex-row items-center justify-center w-24 bg-lightsky rounded-lg`}
        >
          <Text className="text-base mr-2">Next</Text>
          <Feather name="arrow-right-circle" size={18} color="indigo" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Questions;
