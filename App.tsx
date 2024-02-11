// import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import Navbar from "./src/components/Navbar";
import Start from "./src/screens/Start";
import { useEffect, useState } from "react";
import QuestionCard from "./src/screens/Questions";
import { useColorScheme } from "nativewind";
import Analytics from "./src/screens/Analytics";

type QuestionProps = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answers: string[];
};

export type AnswerProps = {
  question: string;
  user_answer: string;
  correct?: boolean;
  correct_answer: string;
};

export default function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(10);
  const [number, setNumber] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [Questions, setQuestions] = useState<QuestionProps[]>([]);
  const [Answers, setAnswers] = useState<AnswerProps[]>([]);
  // console.log("answers", Answers);

  /************************ theme toggle *****************************/
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const BgTheming = colorScheme == "light" ? "bg-[#D6D6D6]" : "bg-[#0C2D48]";
  const TextTheming = colorScheme == "light" ? "gray-900" : "lightgray";

  /************************ Shuffle options *****************************/

  const shuffleOptions = (arr: any[]) =>
    [...arr].sort(() => Math.random() - 0.5);

  /************************ fetch questions *****************************/
  const fetchQuestions = async () => {
    try {
      setStarted(true);
      setLoading(true);
      const data = await (
        await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
      ).json();
      let arr = data?.results.map((question: QuestionProps) => ({
        ...question,
        answers: shuffleOptions([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
      setQuestions(arr);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("fetch error", error);
    }
  };

  /************************ check answer *****************************/
  const checkAnwer = (text: string) => {
    const isCorrect = Questions[number].correct_answer === text;
    //save the attemp to userAnswers
    let ans = {
      question: Questions[number].question,
      user_answer: text,
      correct: isCorrect,
      correct_answer: Questions[number].correct_answer,
    };
    setAnswers((prev) => [...prev, ans]);
  };

  /************************ go to next question *****************************/
  const goToNextQuestion = () => {
    //check if the question is unattemp
    const isAttemped = Answers[number];
    if (!isAttemped) {
      let ans = {
        question: Questions[number].question,
        user_answer: "",
        correct_answer: Questions[number].correct_answer,
      };
      setAnswers((prev) => [...prev, ans]);
    }

    let next = number + 1;
    if (next == amount) {
      setStarted(false);
      setShowAnalytics(true);
    } else setNumber(next);
  };

  /************************ Restart / close anlytics *****************************/
  const StartAgain = () => {
    setAmount(10);
    setCategory("");
    setDifficulty("");
    setAnswers([]);
    setQuestions([]);
    setStarted(false);
    setShowAnalytics(false);
  };

  return (
    <>
      <Navbar />
      <SafeAreaView className={`flex-1 h-full justify-center p-3 ${BgTheming}`}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Image
              className="h-16 w-16"
              source={{
                uri: "https://ieee-pdf-express.org/Content/images/loading.gif",
              }}
              alt="loader"
            />
          </View>
        ) : (
          <>
            {started ? (
              <QuestionCard
                Total={amount}
                difficulty={difficulty}
                category={category}
                number={number + 1}
                question={Questions[number]?.question}
                answers={Questions[number]?.answers}
                checkAnwer={checkAnwer}
                userAnswer={Answers ? Answers[number] : undefined}
                nextQuestion={goToNextQuestion}
              />
            ) : (
              <>
                {showAnalytics ? (
                  <Analytics
                    StartAgain={StartAgain}
                    name={name}
                    AnwersObject={Answers}
                  />
                ) : (
                  <Start
                    name={name}
                    setName={setName}
                    setAmount={setAmount}
                    setCategory={setCategory}
                    setDifficuly={setDifficulty}
                    fetchQuestions={fetchQuestions}
                  />
                )}
              </>
            )}
          </>
        )}
      </SafeAreaView>
      <StatusBar backgroundColor="rgb(49 46 129)" />
    </>
  );
}
