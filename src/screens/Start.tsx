import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import InputWithLabel from "../components/InputWithLabel";
import { useColorScheme } from "nativewind";

type Props = {
  name: string;
  setName: Function;
  setAmount: Function;
  setCategory: Function;
  setDifficuly: Function;
  fetchQuestions: Function;
};

type SelectProps = {
  id: number;
  select: boolean;
  title?: string;
  value?: number;
};

const Start = ({
  name,
  setName,
  setAmount,
  setCategory,
  setDifficuly,
  fetchQuestions,
}: Props) => {
  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const BgTheming = colorScheme == "light" ? "bg-white" : "bg-slate-700";
  const BgTouchable = colorScheme == "light" ? "sky-200" : "lightsky";
  const TextTheming = colorScheme == "light" ? "text-black" : "text-gray-200";

  const [QuestionCategory, setQuestionCategory] = useState<SelectProps[]>([
    {
      id: 1,
      select: true,
      title: "Default",
      value: 0,
    },
    {
      id: 2,
      select: false,
      value: 9,
      title: "General Knowledge",
    },
    {
      id: 3,
      select: false,
      value: 19,
      title: "Mathematics",
    },
    {
      id: 4,
      select: false,
      value: 18,
      title: "Computer Science",
    },
    {
      id: 5,
      select: false,
      value: 21,
      title: "Sports",
    },
  ]);
  const [QuestionNumbers, setQuestionNumbers] = useState<SelectProps[]>([
    {
      id: 1,
      select: true,
      value: 10,
    },
    {
      id: 2,
      select: false,
      value: 15,
    },
    {
      id: 3,
      select: false,
      value: 20,
    },
    {
      id: 4,
      select: false,
      value: 25,
    },
    {
      id: 5,
      select: false,
      value: 30,
    },
  ]);
  const [QuestionDifficulty, setQuestionDifficulty] = useState<SelectProps[]>([
    {
      id: 0,
      select: true,
      title: "Default",
    },
    {
      id: 1,
      select: false,
      title: "easy",
    },
    {
      id: 2,
      select: false,
      title: "medium",
    },
    {
      id: 3,
      select: false,
      title: "hard",
    },
  ]);

  const onButtonClick = (
    item: SelectProps,
    arr: SelectProps[],
    setarray: React.Dispatch<React.SetStateAction<SelectProps[]>>
  ) => {
    let updatedstate = arr.map((islikedItem: SelectProps) =>
      islikedItem.id == item.id
        ? { ...islikedItem, select: true }
        : { ...islikedItem, select: false }
    );
    setarray(updatedstate);
  };

  return (
    <View className={`p-3 rounded-lg flex space-y-6 ${BgTheming}`}>
      {/* <Text className="text-lg font-extrabold tracking-wider italic text-center">
        Play Quizzy !
      </Text> */}
      {/************************ Name Input *****************************/}
      <InputWithLabel
        label="Name"
        value={name}
        onChangeText={(text: string) => {
          setName(text);
        }}
      />

      {/************************ choose number of questions *****************************/}
      <View>
        <Text className={`text-base font-bold pb-1 ${TextTheming}`}>
          Questions
        </Text>
        <View className="flex items-center flex-row gap-x-2">
          {QuestionNumbers?.map((question) => (
            <TouchableOpacity
              key={question.id}
              onPress={() => {
                onButtonClick(question, QuestionNumbers, setQuestionNumbers);
                setAmount(question.value);
              }}
              className={`py-2 px-5 ${
                question.select ? `bg-${BgTouchable}` : "border border-gray-300"
              } rounded-full`}
            >
              <Text className={`text-base ${TextTheming}`}>
                {question.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/************************ choose category of questions *****************************/}
      <View>
        <Text className={`text-base font-bold pb-1 ${TextTheming}`}>
          Categories
        </Text>
        <View className="flex items-center flex-row flex-wrap gap-x-2">
          {QuestionCategory?.map((question) => (
            <TouchableOpacity
              key={question.id}
              onPress={() => {
                onButtonClick(question, QuestionCategory, setQuestionCategory);
                setCategory(question.value);
              }}
              className={`py-2 px-5 ${
                question.select ? `bg-${BgTouchable}` : "border border-gray-300"
              } rounded-full m-1`}
            >
              <Text className={`text-base ${TextTheming}`}>
                {question.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/************************ choose difficulty of questions *****************************/}
      <View>
        <Text className={`text-base font-bold pb-1 ${TextTheming}`}>
          Difficulty
        </Text>
        <View className="flex items-center flex-row flex-wrap gap-x-2">
          {QuestionDifficulty?.map((question) => (
            <TouchableOpacity
              key={question.id}
              onPress={() => {
                onButtonClick(
                  question,
                  QuestionDifficulty,
                  setQuestionDifficulty
                );
                setDifficuly(question.title == "Default" ? "" : question.title);
              }}
              className={`py-2 px-5 ${
                question.select ? `bg-${BgTouchable}` : "border border-gray-300"
              } rounded-full m-1`}
            >
              <Text className={`text-base ${TextTheming} capitalize`}>
                {question.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/************************ Start button *****************************/}
      <TouchableOpacity
        disabled={!name}
        onPress={() => {
          fetchQuestions();
        }}
        className={`mt-4 p-3 ${
          !name ? " border border-gray-400" : "bg-sky-200"
        } rounded-lg `}
      >
        <Text
          className={`text-base font-bold text-center tracking-wider ${
            !name ? "text-gray-400" : "text-black"
          }`}
        >
          Start Game
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;
