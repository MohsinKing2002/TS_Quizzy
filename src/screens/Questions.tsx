import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AnswerProps } from "../../App";
import { useColorScheme } from "nativewind";

type Props = {
  Total: number;
  difficulty: string;
  category: string;
  number: number;
  question: string;
  answers: string[];
  checkAnwer: (answer: string) => void;
  userAnswer: AnswerProps | undefined;
  nextQuestion: (e: any) => void;
};

const Categories = {
  "9": "General Knowledge",
  "21": "Sports",
  "18": "Computer Science",
  "19": "Mathematics",
};

const Questions = ({
  Total,
  difficulty,
  category,
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
  const TextTheming =
    colorScheme == "light" ? "AttendanceStatusListblack" : "gray-200";

  return (
    <View
      className={`p-5 bg-${BgTheming} min-h-[72vh] rounded-lg flex space-y-8`}
    >
      {/************************ Description *****************************/}
      <View className="border-b border-gray-400 pb-3">
        <View className="flex flex-row items-center flex-wrap justify-between gap-2">
          <Text className={`text-sm  text-${TextTheming}`}>
            Questions : {number}/{Total}
          </Text>
          <Text className={`text-sm capitalize text-${TextTheming}`}>
            Difficulty : {difficulty ? difficulty : "Random"}
          </Text>
          <Text className={`text-sm  text-${TextTheming}`}>
            Category : {category ? Categories[category] : "Random"}
          </Text>
        </View>
      </View>
      {/************************ question *****************************/}
      <Text
        className={`flex flex-row items-center font-bold text-lg text-${TextTheming}`}
      >
        {number}. <Text className="font-medium">{question}</Text>
      </Text>
      {/************************ answer options *****************************/}
      <View className="flex space-y-4">
        {answers.length > 0 &&
          answers.map((answer, index) => (
            <TouchableOpacity
              disabled={userAnswer ? true : false}
              key={index}
              onPress={() => checkAnwer(answer)}
              className={`flex flex-row items-center p-2.5 border border-gray-200 rounded-xl ${
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
          className={`p-2 flex flex-row items-center justify-center w-24 bg-sky-200 rounded-lg`}
        >
          <Text className="text-base mr-2">Next</Text>
          <Feather name="arrow-right-circle" size={18} color="indigo" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Questions;
