import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserForm({ onSubmit, email = "" }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    reset({ email });
  }, [email, reset]);

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="relative">
          <input
            type="email"
            id="email"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Use This Email
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
