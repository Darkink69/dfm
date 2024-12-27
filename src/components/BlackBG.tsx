import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const BlackBG = observer(() => {
  return (
    <>
      <div
        onClick={() => {
          store.setSizePlayer(false);
        }}
        className={
          store.bigPlayer
            ? "fixed z-20 w-full h-full backdrop-blur-sm bg-black/30 no-scroll"
            : "hidden"
        }
      ></div>
    </>
  );
});

export default BlackBG;
