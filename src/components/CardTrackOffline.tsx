import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "./store";

const CardTrackOffline = observer(({ data }: any) => {
  const [viewItem, setViewItem] = useState(false);
  // const url = data?.content.assets[0].url.split("?")[0];
  const url = data.url;
  // console.log(data);
  const audio_token = String(localStorage.getItem("data")).slice(1, -1);
  // console.log(audio_token);
  // const itemTrackMore = () => {

  // }

  const downloadTrack = () => {
    try {
      fetch(`https:${url}?${audio_token}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data.track}.mp4`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const addPlaylist = () => {
    console.log("playlist", data.id);
  };

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <div
            className="flex cursor-pointer"
            onClick={() =>
              store.setCurrentPlaying({
                track: data?.track,
                url: `https:${url}?${audio_token}`,
                asset_url: data.asset_url,
              })
            }
          >
            <img
              className="w-[80px] h-[80px]"
              src={
                data.asset_url === null
                  ? "https://cdn-images.audioaddict.com/a/7/3/c/6/c/a73c6ccba5f077b956835714d7e3d9a8.png"
                  : data.asset_url + "?size=80x80&quality=90"
              }
              alt=""
            />
            <div className="pr-8 pl-4">
              <p className="text-white text-sm">{data.track}</p>
              <p className="text-gray-500 text-sm">
                {Math.floor(data.length / 60)}:
                {data.length % 60 < 10
                  ? "0" + (data.length % 60)
                  : data.length % 60}
              </p>
            </div>
          </div>

          <div onClick={() => setViewItem(viewItem ? false : true)}>
            <svg width="3" height="18" viewBox="0 0 4 24" fill="none">
              <path
                d="M4 11.6241C4 10.5314 3.10457 9.64562 2 9.64562C0.89543 9.64562 -1.34244e-07 10.5314 -8.64816e-08 11.6241C-3.87191e-08 12.7168 0.895431 13.6026 2 13.6026C3.10457 13.6026 4 12.7168 4 11.6241Z"
                fill="white"
              />
              <path
                d="M4 1.97846C4 0.885786 3.10457 -4.90408e-06 2 -4.85579e-06C0.89543 -4.80751e-06 -1.34244e-07 0.885786 -8.64816e-08 1.97846C-3.87191e-08 3.07114 0.895431 3.95693 2 3.95693C3.10457 3.95693 4 3.07114 4 1.97846Z"
                fill="white"
              />
              <path
                d="M4 21.0215C4 19.9289 3.10457 19.0431 2 19.0431C0.89543 19.0431 -1.34244e-07 19.9289 -8.64816e-08 21.0215C-3.87191e-08 22.1142 0.895431 23 2 23C3.10457 23 4 22.1142 4 21.0215Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            onClick={() => setViewItem(viewItem ? false : true)}
            className="absolute opacity-80 right-10"
          >
            {viewItem ? (
              <div className="w-full p-4 bg-black">
                <div
                  onClick={() => downloadTrack()}
                  className="text-white text-xl pb-2"
                >
                  Скачать
                </div>
                <div
                  onClick={() => addPlaylist()}
                  className="text-white text-xl"
                >
                  В плейлист
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default CardTrackOffline;
