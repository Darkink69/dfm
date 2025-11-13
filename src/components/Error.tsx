import { observer } from "mobx-react-lite";
import store from "./store";

const Error = observer(() => {
  return (
    <>
      <div
        onClick={() => store.setServerError(false)}
        className={
          store.serverError
            ? "fixed z-20 w-full h-full backdrop-blur-sm bg-black/30 no-scroll text-white text-center"
            : "hidden"
        }
      >
        <div className="p-10 pt-36">
          Пропало соеденение с сервером di.fm... Попробуйте перегрузить страницу
        </div>
        <div className="underline">Закрыть</div>
      </div>
    </>
  );
});

export default Error;
