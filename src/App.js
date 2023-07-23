import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionnaireModal from "./components/QuestionnaireModal";
import { loadUser, selectUser } from "./store/userSlice";
import {
  getQuestions,
  getSubmitions,
  initModal,
} from "./store/questionnaireSlice";
import QuestionnaireResults from "./components/QuestionnaireResults";
import UsserForm from "./components/UserForm";

// localStorage.setItem("user", "example@gmail.com"); // Set user here

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user.data?.email) return;

    const initQuestionnaire = async () => {
      await Promise.all([
        dispatch(getQuestions()).unwrap(),
        dispatch(getSubmitions()).unwrap(),
      ]);
      dispatch(initModal());
    };

    initQuestionnaire();
  }, [dispatch, user.data]);

  const updateUser = ({ email }) => {
    localStorage.setItem("user", email);
    dispatch(loadUser());
  };

  return (
    <div className="App ">
      <div className="md:container md:mx-auto p-3">
        <UsserForm onSubmit={updateUser} email={user?.data?.email} />
        {user.data && (
          <>
            <QuestionnaireResults />
            <QuestionnaireModal />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
