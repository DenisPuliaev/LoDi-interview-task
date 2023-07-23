import { useState } from "react";

const useAnswers = () => {
  const [answers, setAnswers] = useState({});

  const answer = (key, { option, other = "" }) =>
    setAnswers({
      ...answers,
      [key]: {
        other,
        option,
      },
    });

  return {
    answers,
    answer,
  };
};

export const useQuestionnaireFlow = (questions, onSubmit = () => {}) => {
  const { answers, answer } = useAnswers();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const currQuestionKey = questions[step]?.key;

  const answerIsEmpty = (key) => {
    const answer = answers[key];
    return !answer || (answer.option === -1 && !answer.other);
  };

  const setSelectedOption = (option) => {
    const currAnswer = answers[currQuestionKey];
    answer(currQuestionKey, { ...currAnswer, option });
  };

  const setOther = (other) => {
    const currAnswer = answers[currQuestionKey];
    answer(currQuestionKey, { ...currAnswer, other });
  };

  const cleanAnswerOnMove = () => {
    const currAnswer = answers[currQuestionKey];

    if (currAnswer) {
      answer(currQuestionKey, {
        ...currAnswer,
        other: currAnswer.option === -1 ? currAnswer.other : "",
      });
    }
  };

  const toPrev = () => {
    cleanAnswerOnMove();
    setError(false);
    setStep((step) => step - 1);
  };

  const toNext = () => {
    if (answerIsEmpty(currQuestionKey)) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    cleanAnswerOnMove();

    const lastStep = step === questions.length - 1;

    if (lastStep) {
      onSubmit(answers);
    } else {
      setStep((step) => step + 1);
    }
  };

  const canGoBack = step !== 0;

  return {
    answers,
    setOther,
    setSelectedOption,
    step,
    toNext,
    toPrev,
    canGoBack,
    error,
  };
};
