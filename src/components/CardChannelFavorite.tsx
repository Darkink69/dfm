import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const CardChannelFav = observer(({ data }: any) => {
  const wh = window.innerWidth < 640 ? 175 : 300;

  const setCurrentChannelId = () => {
    store.setSpinView("");
    store.setChannel_id(data.channel_id);
    store.setSizePlayer(true);
  };

  return (
    <>
      <div>
        <div onClick={() => setCurrentChannelId()} className="cursor-pointer">
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

export default CardChannelFav;
