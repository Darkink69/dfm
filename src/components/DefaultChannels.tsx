import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
// import store from "./store";

const defaultChannels = observer(() => {
  return (
    <>
      <div className="fixed z-20 w-full h-full bg-slate-800"></div>
    </>
  );
});

export default defaultChannels;
