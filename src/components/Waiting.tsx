import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import store from "./store";

const WaitAnimation = observer(() => {
  useEffect(() => {
    setTimeout(() => {
      store.setSpinView("hidden");
    }, 1500);
  }, [store.spinView]);

  return (
    <>
      <div className={store.spinView + " fixed top-1/2 left-1/2 z-50"}>
        <div className="fixed top-1/2 left-1/2 z-50 flex -ml-14">
          <div className="bg-blue-600 rounded-full w-2 h-2 animate-ping m-4"></div>
          <div className="bg-blue-600 rounded-full w-2 h-2 animate-ping m-4"></div>
          <div className="bg-blue-600 rounded-full w-2 h-2 animate-ping m-4"></div>
        </div>
      </div>
    </>
  );
});

export default WaitAnimation;
