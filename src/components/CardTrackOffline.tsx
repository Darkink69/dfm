import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
import store from "./store";

const CardTrackOffline = observer(({ data }: any) => {
  const url = data?.content.assets[0].url.split("?")[0];
  // console.log(data);
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
      <div className="p-2">
        {/* {data && <div className="flex flex-col items-end"></div>} */}
        <div
          className="flex cursor-pointer"
          onClick={() =>
            // store.setSrcCurrentTrack(`https:${url}?${audio_token}`)
            store.setCurrentPlaying({
              track: data?.track,
              url: `https:${url}?${audio_token}`,
              asset_url: data.asset_url,
            })
          }
        >
          <img className="w-[80px]" src={data.asset_url} alt="" />
          <div className="pr-8 pl-4">
            <p className="text-white text-sm">{data.track}</p>
            <p className="text-white text-sm">{data.release_date}</p>
            <p className="text-gray-500 text-sm">
              {Math.floor(data.length / 60)}:
              {data.length % 60 < 10
                ? "0" + (data.length % 60)
                : data.length % 60}
            </p>
          </div>
        </div>
        {/* <button
          className="w-[200px] bg-lime-500"
          onClick={() => downloadTrack()}
        >
          Скачать
        </button> */}
      </div>
    </>
  );
});

export default CardTrackOffline;
