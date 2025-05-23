import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "./store";

const CardChannel = observer(({ data }: any) => {
  const [name, setName] = useState("");
  const wh = window.innerWidth < 640 ? 175 : 300;

  const setCurrentChannelId = () => {
    store.setSpinView("");
    store.setChannel_id(data.channel_id);
    store.setChannel_name(name);
    store.setSizePlayer(true);
    store.setOnAir(true);
    store.setCurrentSite(store.network_ids.indexOf(data.network_id));
  };

  useEffect(() => {
    // console.log(data);
    if (store.allStationsDataLoaded) {
      const channelNames = JSON.parse(localStorage.getItem("ch") || "[]");
      Object.values(channelNames)?.map((item: any) => {
        if (data.channel_id === item.id) {
          setName(item.name);
        }
      });
    }
  }, [store.allStationsDataLoaded]);

  return (
    <>
      <div>
        <div onClick={() => setCurrentChannelId()} className="cursor-pointer">
          <p className="text-sky-400 text-base sm:text-xl font-bold">{name}</p>
          <img
            src={
              data.art_url === null
                ? "https://cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                : data.art_url + `?size=${wh}x${wh}&quality=90`
            }
            alt={data.track}
          />
          <p className="text-xs sm:text-lg text-white sm:pb-4 pb-2">
            {data.track}
          </p>
        </div>
      </div>
    </>
  );
});

export default CardChannel;
