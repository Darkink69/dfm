// import store from "../store/store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardTrackOffline from "./CardTrackOffline";
// import { channelDataProps } from "../models/model";

const AllTracksOffline = observer(() => {
  const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  const [showOfflineTracks, setShowOfflineTracks] = useState<any>(null);
  const [showTracks, setShowTracks] = useState(20);
  // const [tracks, setTracks] = useState<Test>();
  // const [isLoaded, setIsLoaded] = useState(false);
  // const timerIdRef = useRef<any>(null);
  //   const audioRef = useRef<any>(null);

  const getAllChannelTracks = () => {
    // fetch(
    //   `https://raw.githubusercontent.com/Darkink69/selenium_101ru/refs/heads/main/${
    //     store.sites[store.currentSite]
    //   }/db_${store.sites[store.currentSite]}_full_${store.channel_id}.json`
    // )
    fetch(
      `https://qh8bsvaksadb2kj9.public.blob.vercel-storage.com/${
        store.sites[store.currentSite]
      }/db_${store.sites[store.currentSite]}_full_${
        store.channel_id
      }_light.json`
    )
      .then((response) => response.json())
      .then((data) => setAllChannelTracks(data.sort(() => Math.random() - 0.5)))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setShowOfflineTracks(allChannelTracks?.slice(0, showTracks));
    // setShowTracks(30);
  }, [allChannelTracks, showTracks]);

  useEffect(() => {
    getAllChannelTracks();
  }, [store.channel_id]);

  return (
    <>
      <div
        className={
          store.allChannelsView ? "pl-4 pr-4 mt-8 pb-28" : "pl-4 pr-4 pb-28"
        }
      >
        <div
          className="flex items-baseline pb-2 bg-slate-800"
          onClick={() => {
            store.setSpinView("");
            store.setAllTracksOfflineView(
              store.allTracksOfflineView ? false : true
            );
          }}
        >
          <div className="w-full text-white text-xl cursor-pointer">
            Все треки {store.channel_name}
          </div>
          <svg
            className={store.allTracksOfflineView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1">
          {store.allTracksOfflineView
            ? showOfflineTracks?.map((item: any) => {
                return <CardTrackOffline data={item} key={item.id} />;
              })
            : ""}
        </div>
        <div
          onClick={() => {
            store.setSpinView("");
            setShowTracks(showTracks + 30);
          }}
          className="text-white pt-4 text-lg underline cursor-pointer"
        >
          {store.allTracksOfflineView ? "Показать еще" : ""}
        </div>
      </div>
    </>
  );
});

export default AllTracksOffline;
