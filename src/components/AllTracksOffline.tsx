// import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardTrackOffline from "./CardTrackOffline";
// import { channelDataProps } from "../models/model";

const AllTracksOffline = observer(() => {
  const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  // const [tracks, setTracks] = useState<Test>();
  const [isLoaded, setIsLoaded] = useState(false);
  // const timerIdRef = useRef<any>(null);
  //   const audioRef = useRef<any>(null);

  const getAllChannelTracks = () => {
    fetch(
      `https://raw.githubusercontent.com/Darkink69/selenium_101ru/refs/heads/main/di/db_di_full_${store.channel_id}.json`
    )
      .then((response) => response.json())
      .then((data) => setAllChannelTracks(data.sort(() => Math.random() - 0.5)))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllChannelTracks();
  }, [store.channel_id]);

  return (
    <>
      <div className="flex items-center flex-col p-1">
        <button
          className="w-full bg-lime-500"
          onClick={() => setIsLoaded(!isLoaded)}
        >
          Все треки
        </button>
        <div className="grid sm:grid-cols-5 grid-cols-1">
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
