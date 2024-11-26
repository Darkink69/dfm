import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "./store";

const CardChannel = observer(({ data }) => {
  return (
    <>
      <div className="p-6 mx-auto bg-white">
        {data && <div className="flex flex-col items-end"></div>}
        <div
          onClick={() => store.setChannel_id(data.channel_id)}
          className="cursor-pointer"
        >
          <img src={data.art_url} alt="" />
          <p className="text-black">{data.track}</p>
        </div>
      </div>
    </>
  );
});

export default CardChannel;
