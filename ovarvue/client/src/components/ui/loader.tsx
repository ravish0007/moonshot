import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};