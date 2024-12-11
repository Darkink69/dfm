import { makeAutoObservable } from "mobx";

class Store {
  site = "di";
  channel_id = JSON.parse(localStorage.getItem("channel_id") || "69") || 69;
  channel_name = "XFuture Vocal Lounge Beats";
  srcCurrentTrack = "";
  shuffle = false;
  player = 0;
  currentPlaying = {
    track: "",
    url: "",
    asset_url: "",
  };
  //   currentCity = JSON.parse(localStorage.getItem("currentCity") || "0") || 0;

  constructor() {
    makeAutoObservable(this);
  }

  // setSrcCurrentTrack(srcCurrentTrack: string) {
  //   this.srcCurrentTrack = srcCurrentTrack;
  //   // console.log(srcCurrentTrack, "store!");
  // }

  setCurrentPlaying(currentPlaying: {
    track: string;
    url: string;
    asset_url: string;
  }) {
    this.currentPlaying = currentPlaying;
    // console.log(srcCurrentTrack, "store!");
  }

  setChannel_id(channel_id: number) {
    this.channel_id = channel_id;
    // console.log(channel_id, "store id!");
  }

  //   checkEvents() {
  //     this.favoriteEvents =
  //       JSON.parse(localStorage.getItem("favoriteEvents") || "[]") || [];
  //   }
}

export default new Store();
