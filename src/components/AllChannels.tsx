// import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardChannel from "./CardChannel";

const AllChannels = observer(() => {
  const [allChannels, setAllChannels] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAllChannels = () => {
    fetch(`https://api.audioaddict.com/v1/${store.site}/track_history.json`)
      .then((response) => response.json())
      .then((data) => setAllChannels(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllChannels();
  }, []);

  return (
    <>
      <div className="pt-16 p-4">
        <button
          className="w-full bg-lime-500"
          onClick={() => setIsLoaded(!isLoaded)}
        >
          Все каналы
        </button>
        <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 pt-2">
          {isLoaded ? (
            Object.values(allChannels).map((item: any) => {
              return <CardChannel data={item} key={item.channel_id} />;
            })
          ) : (
            <p className="font-mono text-center text-slate-600 decoration-solid">
              Загрузка...
            </p>
          )}
        </div>
      </div>
    </>
  );
});

export default AllChannels;
