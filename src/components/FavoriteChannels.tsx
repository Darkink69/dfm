import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CardChannel from "./CardChannel";

const FavoriteChannels = observer(() => {
  const [allChannels, setAllChannels] = useState([]);
  // const [allChannels2, setAllChannels2] = useState([]);
  const [allFavChannels, setAllFavChannels] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // const fav = {
  //   currentSite: 0,
  //   channels_id: [69, 3, 6, 104, 183, 293, 296, 348, 355],
  // };

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

  // const getAllChannels2 = (item: string) => {
  //   fetch(`https://api.audioaddict.com/v1/${item}/track_history.json`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };

  useEffect(() => {
    let favChannels: any[] | ((prevState: never[]) => never[]) = [];
    Object.values(allChannels).map((item: any) => {
      if (store.favoriteChannels.channels_id.includes(item.channel_id)) {
        console.log(item.channel_id);
        favChannels.push(item);
      }
    });
    // console.log(favChannels);
    setAllFavChannels(favChannels);
    setIsLoaded(true);
  }, [allChannels]);

  useEffect(() => {
    // store.sites.map((item) => {
    //   // console.log(item);
    //   getAllChannels2(item);
    // });
    getAllChannels();
  }, []);

  return (
    <>
      <div className="pt-20 pl-4 pr-4 ">
        <div className="flex items-baseline bg-slate-800">
          <div
            onClick={() => {
              if (!store.allFavChannelsView) {
                getAllChannels();
                console.log("FAV!!");
              }
              store.setSpinView("");
              store.setAllFavChannelsView(
                store.allFavChannelsView ? false : true
              );
              // store.setSizePlayer(false);
            }}
            className="w-full text-white text-xl cursor-pointer"
          >
            Любимые каналы {store.siteName[store.currentSite]}
          </div>
          <svg
            className={store.allFavChannelsView ? "m-2" : "-rotate-90 m-2"}
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
          >
            <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid sm:grid-cols-5 grid-cols-2 gap-2 pt-4">
          {isLoaded && store.allFavChannelsView
            ? Object.values(allFavChannels).map((item: any) => {
                return <CardChannel data={item} key={item.channel_id} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
});

export default FavoriteChannels;
