import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const CardChannel = observer(({ data }: any) => {
  return (
    <>
      <div>
        {data && <div className="flex flex-col"></div>}
        <p className="text-sky-400 text-base font-bold">{store.channel_name}</p>
        <div
          onClick={() => store.setChannel_id(data.channel_id)}
          className="cursor-pointer"
        >
          <img src={data.art_url} alt={data.track} />
          <p className="text-xs text-white">{data.track}</p>
        </div>
      </div>
    </>
  );
});

export default CardChannel;
