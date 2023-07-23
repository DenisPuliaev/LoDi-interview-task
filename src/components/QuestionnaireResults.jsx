import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import {
  selectQuestionnaire,
  removeQuestionnaire,
} from "../store/questionnaireSlice";

const QuestionnaireResultsItem = ({
  id,
  discovery,
  occupation,
  usageExplanation,
  onRemove,
}) => {
  return (
    <div className="p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        ID {id}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <strong>Discovery: </strong> {discovery}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <strong>Occupation: </strong> {occupation}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <strong>Usage Explanation: </strong> {usageExplanation}
      </p>
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Remove
      </button>
    </div>
  );
};

function QuestionnaireResults() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { submitions } = useSelector(selectQuestionnaire);

  const remove = (id) => dispatch(removeQuestionnaire(id));

  return (
    <>
      <h1 className="text-5xl py-5">Submitions for {user.data.email}</h1>
      {submitions.data.map((i) => (
        <QuestionnaireResultsItem key={i.id} {...i} onRemove={remove} />
      ))}
    </>
  );
}

export default QuestionnaireResults;
