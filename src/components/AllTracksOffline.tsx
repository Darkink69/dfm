// import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardTrackOffline from "./CardTrackOffline";

const AllTracksOffline = observer(() => {
  const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const timerIdRef = useRef<any>(null);
  //   const audioRef = useRef<any>(null);

  const getAllChannelTracks = () => {
    fetch(
      `https://raw.githubusercontent.com/Darkink69/selenium_101ru/refs/heads/main/di/db_di_full_${store.channel_id}.json`
    )
      .then((response) => response.json())
      .then((data) => setAllChannelTracks(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllChannelTracks();
  }, []);

  return (
    <>
      <div className="flex items-center xl:gap-8 gap-2 flex-col sm:pt-40 pt-28 text-sm sm:text-2xl text-white font-bold sm:p-5 p-6">
        <button
          className="w-[500px] bg-lime-500"
          onClick={() => setIsLoaded(!isLoaded)}
        >
          Все треки
        </button>
        <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 pt-4">
          {isLoaded ? (
            allChannelTracks?.map((item: any) => {
              return <CardTrackOffline data={item} key={item.id} />;
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

export default AllTracksOffline;
