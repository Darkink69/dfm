import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
// import store from "./store";

const Loader = observer(() => {
  return (
    <>
      <div className="w-full h-full bg-black">
        <div className="text-white p-10 pt-36">загрузка...</div>
      </div>
    </>
  );
});

export default Loader;
