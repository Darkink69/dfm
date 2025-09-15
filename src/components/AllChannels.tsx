import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import store from "./store";
import CardChannel from "./CardChannel";
// import WaitAnimation from "./Waiting";

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
        className={
          store.allFavChannelsView ? "pl-4 pr-4 mt-8" : "pl-4 pr-4 pb-3"
        }
      >
        <div
          className="flex items-center bg-slate-800"
          onClick={() => {
            if (!store.allChannelsView) {
              {
                getAllChannels();
              }
            }

            store.setAllChannelsView(store.allChannelsView ? false : true);
            store.setSizePlayer(false);
            // store.setSpinView("");
          }}
        >
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
            <rect
              x="1"
              y="6"
              width="22"
              height="14"
              rx="2"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="8" cy="13" r="4" stroke="white" strokeWidth="2" />
            <path
              d="M20.2983 1.95448C20.8254 1.78975 21.1192 1.22887 20.9545 0.701725C20.7897 0.17458 20.2289 -0.119213 19.7017 0.04552L20.2983 1.95448ZM4.29827 6.95448L20.2983 1.95448L19.7017 0.04552L3.70173 5.04552L4.29827 6.95448Z"
              fill="white"
            />
            <path
              d="M14.5 9.5H19.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="pl-4 w-full text-white text-xl cursor-pointer">
            Все каналы{" "}
            <span className="font-bold">
              {store.siteName[store.currentSite]}
            </span>
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
