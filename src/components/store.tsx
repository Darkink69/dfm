import { makeAutoObservable } from "mobx";

class Store {
  sites = [
    "di",
    "rockradio",
    "radiotunes",
    "jazzradio",
    "classicalradio",
    "zenradio",
  ];
  siteName = ["Electronic", "Rock", "Tunes", "Jazz", "Classical", "Zen"];
  currentSite = JSON.parse(localStorage.getItem("currentSite") || "0") || 0;
  channel_id = JSON.parse(localStorage.getItem("channel_id") || "69") || 69;
  channel_name = localStorage.getItem("channel_name") || "Classic EuroDance";
  // srcCurrentTrack = "";
  shuffle = false;
  bigPlayer = true;
  allFavChannelsView = true;
  allChannelsView = false;
  allTracksOfflineView = false;

  spinView = "";

  // defaultChannels = [
  //   { currentSite: 0, channel_id: 69 },
  //   { currentSite: 1, channel_id: 143 },
  //   { currentSite: 2, channel_id: 38 },
  //   { currentSite: 3, channel_id: 73 },
  //   { currentSite: 4, channel_id: 360 },
  //   { currentSite: 5, channel_id: 449 },
  // ];

  currentPlaying = {
    track: "",
    url: "",
    asset_url: "",
  };
  allStationsNames = [{}];

  favoriteChannels = {
    currentSite: 0,
    channels_id:
      JSON.parse(localStorage.getItem("favoriteChannels") || "[]") || [],
  };

  onAir = false;
  switchChannel = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPlaying(currentPlaying: {
    track: string;
    url: string;
    asset_url: string;
  }) {
    this.currentPlaying = currentPlaying;
  }

  setChannel_id(channel_id: number) {
    this.channel_id = channel_id;
    localStorage.setItem("channel_id", JSON.stringify(channel_id));
  }

  setChannel_name(channel_name: string) {
    this.channel_name = channel_name;
    localStorage.setItem("channel_name", channel_name);
  }

  setAllStationsNames(allNames: { id: number; name: string }[]) {
    this.allStationsNames = allNames;
  }

  setSizePlayer(size: boolean) {
    this.bigPlayer = size;
  }

  setCurrentSite(currentSite: number) {
    this.currentSite = currentSite;
    this.switchChannel = false;
    localStorage.setItem("currentSite", JSON.stringify(currentSite));
  }

  setSwitchChannel(view: boolean) {
    this.switchChannel = view;
  }

  setAllFavChannelsView(view: boolean) {
    this.allFavChannelsView = view;
  }

  setAllChannelsView(view: boolean) {
    this.allChannelsView = view;
  }

  setAllTracksOfflineView(view: boolean) {
    this.allTracksOfflineView = view;
  }

  setOnAir(air: boolean) {
    this.onAir = air;
    console.log(air, "store!!");
  }

  setSpinView(view: string) {
    this.spinView = view;
  }

  setfavoriteChannels(id: number) {
    if (this.favoriteChannels.channels_id.includes(id)) {
      for (
        let i = 0, len = this.favoriteChannels.channels_id.length;
        i < len;
        i++
      ) {
        if (this.favoriteChannels.channels_id[i] === id) {
          this.favoriteChannels.channels_id.splice(i, 1);
          break;
        }
      }
    } else {
      this.favoriteChannels.channels_id.push(id);
    }
    localStorage.setItem(
      "favoriteChannels",
      JSON.stringify(this.favoriteChannels.channels_id)
    );
    this.allFavChannelsView = false;
  }
}

export default new Store();
