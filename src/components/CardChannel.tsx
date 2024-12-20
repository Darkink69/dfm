import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "./store";

const CardChannel = observer(({ data }: any) => {
  const [name, setName] = useState("");

  const setCurrentChannelId = () => {
    store.setChannel_id(data.channel_id);
    store.setChannel_name(name);
    store.setSizePlayer(true);
    // localStorage.setItem("channel_id", JSON.stringify(data.channel_id));
    // localStorage.setItem("channel_name", name);
  };

  useEffect(() => {
    store.allStationsNames.map((item: any) => {
      if (data.channel_id === item.id) {
        setName(item.name);
      }
    });
  }, [store.allStationsNames]);

  return (
    <>
      <div>
        <div onClick={() => setCurrentChannelId()} className="cursor-pointer">
          <p className="text-sky-400 text-base font-bold">{name}</p>
          <img
            src={
              data.art_url === null
                ? "https://cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                : data.art_url
            }
            alt={data.track}
          />
          <p className="text-xs text-white">{data.track}</p>
        </div>
      </div>
    </>
  );
});

export default CardChannel;
