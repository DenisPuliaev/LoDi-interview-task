const SHOW_MODAL_AGAIN_KEY = "show_modal_again";

export const setShowAgain = (show) =>
  localStorage.setItem(SHOW_MODAL_AGAIN_KEY, JSON.stringify(show));

export const getShowAgain = (show) => {
  const showAgain = localStorage.getItem(SHOW_MODAL_AGAIN_KEY);
  return showAgain === null ? true : JSON.parse(showAgain);
};
