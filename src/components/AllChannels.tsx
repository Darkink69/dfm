import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardChannel from "./CardChannel";

const AllChannels = observer(() => {
  const [allChannels, setAllChannels] = useState([]);

  const getAllChannels = () => {
    fetch(
      `https://api.audioaddict.com/v1/${
        store.sites[store.currentSite]
      }/track_history.json`
    )
      .then((response) => response.json())
      .then((data) => setAllChannels(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllChannels();
  }, []);

  return (
    <>
      <div
        className={store.allFavChannelsView ? "pl-4 pr-4 mt-8" : "pl-4 pr-4"}
      >
        <div className="flex items-baseline bg-slate-800">
          <div
            className="w-full text-white text-xl cursor-pointer"
            onClick={() => {
              if (!store.allChannelsView) {
                getAllChannels();
              }
              store.setAllChannelsView(store.allChannelsView ? false : true);
              store.setSizePlayer(false);
            }}
          >
            Все каналы
          </div>
          <svg
            className={store.allChannelsView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 pt-4">
          {store.allChannelsView
            ? Object.values(allChannels).map((item: any) => {
                return <CardChannel data={item} key={item.channel_id} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
});

export default AllChannels;
