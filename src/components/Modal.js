import React from "react";
import { ReactComponent as CloseIcon } from "../assets/CloseIcon.svg";
import { Dialog, Transition } from "@headlessui/react";

const QuestionnaireModal = ({ children, open, handleClose }) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto custom-scroll">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-[700px] max-w-11/12 pt-8 flex flex-col gap-6 justify-around items-center overflow-hidden relative bg-app-black rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-8 aspect-square rounded-full absolute top-2 right-3 bg-black bg-opacity-60 hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center"
                  onClick={handleClose}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuestionnaireModal;
