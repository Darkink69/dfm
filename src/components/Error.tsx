import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const Error = observer(() => {
  return (
    <>
      <div
        onClick={() => {
          console.log("error");
        }}
        className={
          store.serverError
            ? "fixed z-20 w-full h-full backdrop-blur-sm bg-black/30 no-scroll"
            : "hidden"
        }
      >
        <div className="text-white p-10 pt-36">
          Пропало соеденение с сервером di.fm... Попробуйте перегрузить страницу
          нажав на лого вверху
        </div>
      </div>
    </>
  );
});

export default Error;
