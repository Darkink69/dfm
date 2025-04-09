import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const Menu = observer(() => {
  // const [os, setOs] = useState("");

  const setRandomtChannel = () => {
    console.log("Random!");
    store.setSpinView("");
    store.setMenuView(false);
    // store.setChannel_id(data.channel_id);
    // store.setChannel_name(name);
    // store.setSizePlayer(true);
    // store.setOnAir(true);
    // store.setCurrentSite(store.network_ids.indexOf(data.network_id));
  };

  useEffect(() => {
    // const os = navigator.userAgent;
    // if (os.includes("Android")) {
    //   setOs("Android");
    // }
    // if (os.includes("iPhone") || os.includes("iPad")) {
    //   setOs("iPhone");
    // }
  }, []);

  return (
    <>
      {store.menuView ? (
        <div className="absolute z-20 w-full sm:h-[500px] h-full bg-black opacity-90 animate-down">
          <div className="grid sm:grid-cols-2 grid-cols-1 justify-center cursor-pointer">
            {/* <div className="relative top-10 p-10 text-white">
              Тут пока ничего нет, а будут настройки. Передаю привет всему
              комьюнити Di.FM на 4pda!
            </div> */}
            <div
              className="relative top-10 p-10 w-full text-white text-xl cursor-pointer"
              onClick={() => setRandomtChannel()}
            >
              Случайный канал
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default Menu;
