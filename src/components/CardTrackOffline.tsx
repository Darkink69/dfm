import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const CardTrackOffline = observer(({ data }: any) => {
  const url = data?.content.assets[0].url.split("?")[0];
  // console.log(url);
  const audio_token = String(localStorage.getItem("data")).slice(1, -1);
  // console.log(audio_token);
  const downloadTrack = () => {
    try {
      fetch(`https:${url}?${audio_token}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data.track}.mp3`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-6 mx-auto bg-white">
        {data && <div className="flex flex-col items-end"></div>}
        <div
          className="cursor-pointer"
          onClick={() =>
            store.setSrcCurrentTrack(`https:${url}?${audio_token}`)
          }
        >
          <img src={data.asset_url} alt="" />
          <p className="text-black">{data.track}</p>
        </div>
        <button
          className="w-[200px] bg-lime-500"
          onClick={() => downloadTrack()}
        >
          Скачать
        </button>
      </div>
    </>
  );
});

export default CardTrackOffline;
