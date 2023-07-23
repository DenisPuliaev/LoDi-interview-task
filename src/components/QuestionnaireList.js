import React, { useEffect, useMemo, useState } from "react";
import { ReactComponent as OtherIcon } from "../assets/questionnaire/other.svg";
import { RadioGroup } from "@headlessui/react";
import { iconNameToIcon } from "./questionnaire";

const QuestionnaireOptions = ({
  options,
  onChange,
  value,
  onOtherChange,
  otherValue = "",
}) => {
  const handleOtherChange = (e) => {
    onOtherChange(e.target.value);
  };

  return (
    <RadioGroup
      className="w-[70%] grid grid-cols-2 grid-rows-2 gap-4 [&>div]:aspect-square"
      onChange={onChange}
      value={value}
    >
      {options.map((option, index) => (
        <RadioGroup.Option
          key={index}
          className={`p-4 flex flex-col items-center justify-center gap-4 rounded-md bg-app-bg-gray ui-checked:outline-[2px] ui-checked:[outline-style:solid] ui-checked:outline-app-green transition-all duration-300`}
          value={index}
        >
          {iconNameToIcon[option.icon]}
          <span className="text-white text-base">{option.title}</span>
          <span className="w-11/12 text-sm text-modal-description">
            {option.subtitle}
          </span>
        </RadioGroup.Option>
      ))}
      <RadioGroup.Option
        key={-1}
        className={`p-4 flex flex-col items-center justify-center gap-4 rounded-md bg-app-bg-gray ui-checked:outline-[2px] ui-checked:[outline-style:solid] ui-checked:outline-app-green transition-all duration-300`}
        value={-1}
      >
        <OtherIcon className="" />
        <span className="text-white text-base">Other</span>
        <textarea
          rows={3}
          value={otherValue}
          className="w-11/12 text-sm text-modal-description p-2 rounded-lg !outline-none bg-app-bg-gray placeholder:text-modal-description border-solid border border-text-field-border "
          placeholder="Please specify."
          onChange={handleOtherChange}
        />
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default QuestionnaireOptions;
