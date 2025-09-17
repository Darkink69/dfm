import store from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
// import HamburgerMenu from "./HamburgerMenu";

const Menu = observer(() => {
  // const [os, setOs] = useState("");
  const [viewOptions, setViewOptions] = useState(true);
  // const [sliderValue, setSliderValue] = useState(2);
  const [viewTipsRnd, setViewTipsRnd] = useState(false);
  const [viewTipsSwitch, setViewTipsSwitch] = useState(false);

  const labels = [
    { value: 1, text: "Выкл." },
    { value: 2, text: "Редко" },
    { value: 3, text: "Средне" },
    { value: 4, text: "Часто" },
  ];

  const setRandomtChannel = () => {
    const channelNames = JSON.parse(localStorage.getItem("ch") || "0");
    const rndChannel = channelNames.sort(() => Math.random() - 0.5)[0];
    store.setSpinView("");
    store.setMenuView(false);
    store.setCurrentSite(store.network_ids.indexOf(rndChannel.network_id));
    store.setChannel_id(rndChannel.id);
    store.setSizePlayer(true);
    store.setChannel_name(rndChannel.name);
  };

  useEffect(() => {
    // const os = navigator.userAgent;
    // if (os.includes("Android")) {
    //   setOs("Android");
    // }
    // if (os.includes("iPhone") || os.includes("iPad")) {
    //   setOs("iPhone");
    // }
  }, []);

  return (
    <>
      {store.menuView ? (
        <div className="fixed z-20 w-full sm:h-[500px] h-full bg-black opacity-90 animate-down">
          <div className="bg-black min-h-screen text-white p-6 flex flex-col">
            <div className="flex items-center justify-center mb-4 pt-20">
              <h1
                className="text-xl cursor-pointer pr-2"
                onClick={() => setRandomtChannel()}
              >
                Случайный канал
              </h1>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setViewTipsRnd(!viewTipsRnd);
                  setViewTipsSwitch(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4.64258 5.70605C4.72005 4.81738 5.05273 4.11328 5.64062 3.59375C6.23307 3.06966 6.98275 2.80762 7.88965 2.80762C8.85124 2.80762 9.62826 3.0651 10.2207 3.58008C10.8132 4.09049 11.1094 4.74219 11.1094 5.53516C11.1094 5.98177 11.0068 6.39648 10.8018 6.7793C10.6012 7.16211 10.2207 7.58594 9.66016 8.05078C9.09961 8.51562 8.75553 8.88704 8.62793 9.16504C8.50033 9.43848 8.43652 9.89648 8.43652 10.5391H7.2334C7.2334 9.69141 7.33138 9.07161 7.52734 8.67969C7.72331 8.2832 8.08333 7.86165 8.60742 7.41504C9.13607 6.96842 9.46419 6.62663 9.5918 6.38965C9.7194 6.14811 9.7832 5.8929 9.7832 5.62402C9.7832 5.09993 9.61003 4.66927 9.26367 4.33203C8.91732 3.99023 8.46387 3.81934 7.90332 3.81934C6.80957 3.81934 6.16699 4.44824 5.97559 5.70605H4.64258ZM8.58008 13H7.17871V11.5986H8.58008V13Z"
                    fill="#808080"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="7.25"
                    stroke="#808080"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              {viewTipsRnd && (
                <div className="absolute w-[200px] p-4 bg-black cursor-pointer opacity-80">
                  <div
                    className="text-white text-base pb-2"
                    onClick={() => setViewTipsRnd(!viewTipsRnd)}
                  >
                    <div className="flex items-center w-[200px]">
                      Включается случайный канал (радиостанция) из всех
                      существующих.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex items-center justify-center mb-6 pt-4"
              onClick={() => setViewOptions(!viewOptions)}
            >
              <h2 className="text-xl cursor-pointer">Настройки</h2>
              <svg
                className={viewOptions ? "m-2" : " rotate-180 m-2"}
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
              >
                <path d="M1 1L8 9L15 1" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            {viewOptions ? (
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-white text-base pr-2">
                    Качество звучания
                  </h3>
                </div>

                <div className="flex-col mb-8">
                  <div className="flex items-center justify-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bitrate"
                        value="64"
                        checked={!store.bitratePremium}
                        onChange={() => store.setBitratePremium(false)}
                        className="w-4 h-4 text-teal-400 bg-teal-400 border-teal-400"
                      />
                      <span
                        className={
                          !store.bitratePremium
                            ? "ml-2 text-base text-teal-400 font-bold"
                            : "ml-2 text-white"
                        }
                      >
                        64 кбит/с AAC-HE
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bitrate"
                        value="320"
                        checked={store.bitratePremium}
                        onChange={() => store.setBitratePremium(true)}
                        className="w-4 h-4 text-teal-400 bg-gray-100 border-teal-400"
                      />
                      <span
                        className={
                          store.bitratePremium
                            ? "ml-2 text-base text-teal-400 font-bold"
                            : "ml-2 text-white"
                        }
                      >
                        320 кбит/с MP3
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <h3 className="text-white text-base pr-2">
                    Автопереключение каналов
                  </h3>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setViewTipsSwitch(!viewTipsSwitch);
                      setViewTipsRnd(false);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4.64258 5.70605C4.72005 4.81738 5.05273 4.11328 5.64062 3.59375C6.23307 3.06966 6.98275 2.80762 7.88965 2.80762C8.85124 2.80762 9.62826 3.0651 10.2207 3.58008C10.8132 4.09049 11.1094 4.74219 11.1094 5.53516C11.1094 5.98177 11.0068 6.39648 10.8018 6.7793C10.6012 7.16211 10.2207 7.58594 9.66016 8.05078C9.09961 8.51562 8.75553 8.88704 8.62793 9.16504C8.50033 9.43848 8.43652 9.89648 8.43652 10.5391H7.2334C7.2334 9.69141 7.33138 9.07161 7.52734 8.67969C7.72331 8.2832 8.08333 7.86165 8.60742 7.41504C9.13607 6.96842 9.46419 6.62663 9.5918 6.38965C9.7194 6.14811 9.7832 5.8929 9.7832 5.62402C9.7832 5.09993 9.61003 4.66927 9.26367 4.33203C8.91732 3.99023 8.46387 3.81934 7.90332 3.81934C6.80957 3.81934 6.16699 4.44824 5.97559 5.70605H4.64258ZM8.58008 13H7.17871V11.5986H8.58008V13Z"
                        fill="#808080"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="7.25"
                        stroke="#808080"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  {viewTipsSwitch && (
                    <div className="absolute w-[300px] p-4 bg-black cursor-pointer opacity-80">
                      <div
                        className="text-white text-base pb-2"
                        onClick={() => setViewTipsSwitch(!viewTipsSwitch)}
                      >
                        <div className="flex items-center w-[280px]">
                          Через определенное количество треков, которые
                          прозвучали в эфире радиостанции, включается следующий
                          канал из списка Любимых.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={store.options.shuffle}
                    onChange={(e) => {
                      // setSliderValue(Number(e.target.value));
                      store.setOptions(Number(e.target.value));
                      // console.log(store.options.shuffle);
                    }}
                    className="w-full sm:w-1/4 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-between mb-2 w-full sm:w-1/4 pt-2">
                    {labels.map((item) => (
                      <span
                        key={item.value}
                        className={`text-sm ${
                          store.options.shuffle === item.value
                            ? "text-teal-400"
                            : "text-gray-200"
                        }`}
                      >
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              className="bg-teal-600 text-white text-xl py-3 px-6 rounded-lg mt-auto mb-20 mx-auto w-full sm:w-1/4"
              onClick={() => console.log("Donate!")}
            >
              <a href="https://pay.cloudtips.ru/p/2fa6b923" target="_blank">
                Сделать донат
              </a>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default Menu;
