import React from "react";
import { ReactComponent as ChevronDown } from "../assets/ChevronDownLightGray.svg";

const QuestionnaireNav = ({
  onNext,
  onPrev,
  prevDisabled,
  currStep,
  totalSteps,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <button
        className="h-12 py-4 pl-3 pr-1 rounded-md group flex gap-1 items-center justify-center transition-all duration-300 [&_path]:transition-all [&_path]:duration-300 group disabled:cursor-not-allowed"
        disabled={prevDisabled}
        onClick={onPrev}
      >
        <ChevronDown
          className={`rotate-90 [&>path]:stroke-back-btn  w-6 h-6 group-hover:[&>path]:stroke-app-green relative ml-0 mr-1 group-hover:ml-1 group-hover:mr-0 transition-all duration-300`}
        />
      </button>
      <button
        className="h-12 py-4 pl-3 pr-1 border border-solid border-carousel-button-border bg-app-bg-gray rounded-md group flex gap-1 items-center justify-center transition-all duration-300 [&_path]:transition-all [&_path]:duration-300 group disabled:cursor-not-allowed"
        onClick={onNext}
      >
        <span className="text-carousel-next-count mr-1">
          {currStep} / {totalSteps}
        </span>

        <span className="text-white group-disabled:text-carousel-next-count">
          Next
        </span>

        <ChevronDown
          className={`-rotate-90 [&>path]:stroke-white group-hover:[&>path]:stroke-app-green relative ml-0 mr-1 group-hover:ml-1 group-hover:mr-0 transition-all duration-300`}
        />
      </button>
    </div>
  );
};

export default QuestionnaireNav;
