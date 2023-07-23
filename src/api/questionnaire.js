import client from "./client";

export const getQuestionnaireList = (user) =>
  client
    .get("/questionnaire/", {
      params: {
        user,
      },
    })
    .then((res) => res.data);

export const submitQuestionnaire = (data) =>
  client.post("/questionnaire/", data).then((res) => res.data);

export const removeQuestionnaire = (id) =>
  client.delete(`/questionnaire/${id}`);
