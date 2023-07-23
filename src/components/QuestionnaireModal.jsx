import React from "react";
import { ReactComponent as CheckmarkIcon } from "../assets/CheckmarkIconGray.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import QuestionnaireOptions from "./QuestionnaireOptions";
import QuestionnaireNav from "./QuestionnaireNav";
import { useQuestionnaireFlow } from "../hooks/questionnaire";
import {
  selectQuestionnaire,
  setShowModal,
  sendAnswers,
} from "../store/questionnaireSlice";
import { setShowAgain } from "../utils/questionnaireModal";

const QuestionnaireModal = () => {
  const dispatch = useDispatch();
  const questionnaire = useSelector(selectQuestionnaire);
  const questions = questionnaire.questions.data;

  const handleSubmit = async (data) => {
    await dispatch(sendAnswers({ answers: data })).unwrap();
  };

  const {
    answers,
    setOther,
    setSelectedOption,
    step,
    toNext,
    toPrev,
    canGoBack,
    error,
  } = useQuestionnaireFlow(questions, handleSubmit);

  const currOptions = questions[step]?.options || [];
  const key = questions[step]?.key;

  const handleDontShowAgain = (e) => setShowAgain(!e.target.checked);

  return (
    <Modal
      open={questionnaire.showModal}
      handleClose={() => dispatch(setShowModal(false))}
    >
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-white text-2xl font-bold text-center">Question?</h1>

        <p className="text-modal-description text-sm text-center w-9/12 ">
          Your feedback will help us in developing new features and improving
          logo diffusion
        </p>
      </div>

      <QuestionnaireOptions
        key={step}
        value={
          Number.isInteger(answers[key]?.option) ? answers[key].option : null
        }
        otherValue={answers[key]?.other || ""}
        options={currOptions}
        onChange={setSelectedOption}
        onOtherChange={setOther}
      />

      {error && <span className="text-red-600">Error</span>}

      <QuestionnaireNav
        onNext={toNext}
        onPrev={toPrev}
        prevDisabled={!canGoBack}
        currStep={step + 1}
        totalSteps={questions.length}
      />

      <div className="bg-app-bg-gray w-full p-4 flex items-center justify-center ">
        <div className="flex flex-row">
          <input
            type="checkbox"
            id="dont-show"
            onChange={handleDontShowAgain}
            className="appearance-none h-[17px] w-[17px]  rounded-[4px] border-[1.5px] border-solid border-checkmark-border transition-all duration-200 peer"
          />
          <CheckmarkIcon className="opacity-0 peer-checked:opacity-100 [&>path]:stroke-checkmark-check absolute rounded-full pointer-events-none my-1 mx-1 transition-all duration-200 w-[9px] h-[9px]" />
          <label
            htmlFor="dont-show"
            className="flex flex-col justify-center px-2 select-none text-xs text-title-white"
          >
            Don't show this again
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionnaireModal;
