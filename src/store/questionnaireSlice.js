import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import keyBy from "lodash.keyby";
import { QuestionnairePages } from "../components/questionnaire";
import { getShowAgain } from "../utils/questionnaireModal";
import * as questionnaireAPI from "../api/questionnaire";

const initialState = {
  showModal: false,
  questions: {
    data: [],
    progress: "idle", // idle | loading | error | succeeded
  },
  submitions: {
    data: [],
    progress: "idle", // idle | loading | error | succeeded
  },
};

export const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setShowModal(state, { payload }) {
      state.showModal = payload;
    },
    setQuestions(state, { payload }) {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initModal.fulfilled, (state, { payload }) => {
      Object.assign(state, payload);
    });

    builder
      .addCase(getQuestions.pending, (state) => {
        state.questions.progress = "loading";
      })
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        state.questions.data = payload;
        state.questions.progress = "succeeded";
      })
      .addCase(getQuestions.rejected, (state, payload) => {
        state.questions.progress = "error";
      });

    builder
      .addCase(getSubmitions.pending, (state) => {
        state.submitions.progress = "loading";
      })
      .addCase(getSubmitions.fulfilled, (state, { payload }) => {
        state.submitions.data = payload;
        state.submitions.progress = "succeeded";
      })
      .addCase(getSubmitions.rejected, (state, payload) => {
        state.submitions.progress = "error";
      });
  },
});

export const getQuestions = createAsyncThunk(
  "questionnaire/getQuestion",
  async () => QuestionnairePages
);

export const getSubmitions = createAsyncThunk(
  "questionnaire/getSubmitions",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();

      const usersAnswers = await questionnaireAPI.getQuestionnaireList(
        user.data.email
      );

      return usersAnswers;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const initModal = createAsyncThunk(
  "questionnaire/init",
  async (_, { getState }) => {
    const showAgain = getShowAgain();

    if (!showAgain) {
      return { showModal: false };
    }

    const {
      questionnaire: { submitions },
    } = getState();

    const hasSubmited = submitions.data.length > 0;

    if (hasSubmited) {
      return { showModal: false };
    }

    return {
      showModal: true,
    };
  }
);

export const removeQuestionnaire = createAsyncThunk(
  "questionnaire/init",
  async (id, { dispatch }) => {
    try {
      await questionnaireAPI.removeQuestionnaire(id);
      await dispatch(getSubmitions()).unwrap();
    } catch (e) {}
  }
);

export const sendAnswers = createAsyncThunk(
  "questionnaire/send",
  async ({ answers }, { rejectWithValue, dispatch, getState }) => {
    try {
      const {
        user,
        questionnaire: { questions },
      } = getState();

      const questionsByKeys = keyBy(questions.data, "key");

      const combinedAnswers = Object.keys(answers).reduce((acc, key) => {
        const option = answers[key].option;
        return {
          ...acc,
          [key]:
            option === -1
              ? answers[key].other
              : questionsByKeys[key].options[option].title,
        };
      }, {});

      await questionnaireAPI.submitQuestionnaire({
        user: user.data.email,
        ...combinedAnswers,
      });

      dispatch(setShowModal(false));
      dispatch(getSubmitions());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const { setShowModal } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;

export const selectQuestionnaire = (state) => state.questionnaire;
