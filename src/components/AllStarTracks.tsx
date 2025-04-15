import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardTrackStar from "./CardTrackStar";

const AllStarTracks = observer(() => {
  // const [allChannelTracks, setAllChannelTracks] = useState<any>(null);
  // const [showOfflineTracks, setShowOfflineTracks] = useState<any>(null);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const stars = JSON.parse(localStorage.getItem("stars") || "[]");
    setData(stars);
    // console.log(stars);
    store.setRemoveStarTrack(false);
  }, [store.allStarTracksView, store.removeStarTrack]);

  return (
    <>
      <div
        className={
          store.allTracksOfflineView
            ? "pl-4 pr-4 mt-8 pb-28"
            : "pl-4 pr-4 pb-28"
        }
      >
        <div
          className="flex items-center pb-4 bg-slate-800"
          onClick={() => {
            store.setAllStarTracksView(store.allStarTracksView ? false : true);
          }}
        >
          <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
            <path
              d="M12.0006 2.27355L14.8098 8.01057L15.0415 8.48389L15.563 8.56025L21.8628 9.48287L17.2996 13.9656L16.9269 14.3317L17.0146 14.8468L18.0899 21.1654L12.469 18.1872L12.0008 17.9391L11.5327 18.1871L5.91004 21.1656L6.98544 14.8468L7.07309 14.3317L6.7004 13.9656L2.13717 9.48287L8.43703 8.56025L8.95837 8.4839L9.19016 8.01072L12.0006 2.27355Z"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          <div className="pl-4 w-full text-white text-xl cursor-pointer">
            Мои избранные треки
          </div>
          <svg
            className={store.allStarTracksView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid grid-cols-1">
          {store.allStarTracksView ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-left grid-cols-1">
              {store.allStarTracksView
                ? data?.map((item: any) => {
                    return <CardTrackStar data={item} key={item.id} />;
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});

export default AllStarTracks;
