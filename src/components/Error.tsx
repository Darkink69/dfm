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
          Нет соеденения с сервером di.fm... Попробуйте переключить канал и/или
          перегрузить страницу
        </div>
      </div>
    </>
  );
});

export default Error;
