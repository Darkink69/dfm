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
  network_ids = [1, 13, 2, 12, 15, 16];
  currentSite = JSON.parse(localStorage.getItem("currentSite") || "0") || 0;
  channel_id: number =
    JSON.parse(localStorage.getItem("channel_id") || "69") || 69;
  channel_name = localStorage.getItem("channel_name") || "Classic EuroDance";
  onlyChannelIds: any = [];

  premium = "615841863e5533f627fa26bd6e921776";
  // allTokens: any = [this.premium];
  allTokens: any = [
    "7e938c7250620a6fa561a93e733224a3",
    "9c6018c2679a51df92a51feab8f169e4",
    "958b3ee79e1b5cac40b80a71a1bf463b",
  ];

  allStationsData = [{}];
  allStationsDataLoaded = false;
  removeStarTrack = false;

  options = JSON.parse(
    localStorage.getItem("options") || '{"shuffle":2,"favChannels":1}'
  );
  countPlayingTracks = 0;
  minMax = [
    [0, 0],
    [7, 11],
    [2, 6],
    [1, 1],
  ];

  bigPlayer = true;
  allFavChannelsView = true;
  allChannelsView = false;
  allTracksOfflineView = false;
  allStarTracksView = false;
  searchView = false;
  menuView = false;
  serverError = false;

  spinView = "";

  currentPlaying = {
    track: "",
    url: "",
    asset_url: "",
  };
  allStationsNames = [{}];
  allStationIds: any = [];

  favNamesSites: any = [];

  favoriteChannels = {
    currentSite: 0,
    channels_id: JSON.parse(localStorage.getItem("favoriteChannels") || "[]"),
  };

  onAir = false;
  switchChannel = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAllTokens(allTokens: any) {
    this.allTokens = allTokens;
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

  setAllStationsData(data: any) {
    this.allStationsData = data;
    // console.log(this.allStationsData);
  }

  setChannel_name(channel_name: string) {
    this.channel_name = channel_name;
    console.log(channel_name);
    localStorage.setItem("channel_name", channel_name);
  }

  setAllStationsNames(allNames: { id: number; name: string }[]) {
    this.allStationsNames = allNames;
  }

  setAllStationIds(ids: { id: number }[]) {
    this.allStationIds = ids;
    // console.log(this.allStationIds);
  }

  setAllStationsDataLoaded(loaded: boolean) {
    this.allStationsDataLoaded = loaded;
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

  setAllStarTracksView(view: boolean) {
    this.allStarTracksView = view;
  }

  setOnAir(air: boolean) {
    this.onAir = air;
  }

  setSpinView(view: string) {
    this.spinView = view;
  }

  setFavNamesSites(sites: any[]) {
    this.favNamesSites = sites;
  }

  setRemoveStarTrack(remove: boolean) {
    this.removeStarTrack = remove;
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

  setOptions(shuffle: number) {
    this.options.shuffle = shuffle;
    localStorage.setItem("options", JSON.stringify(this.options));
  }

  setCountPlayingTracks(count: number) {
    this.countPlayingTracks = count;
  }

  setSearchView(view: boolean) {
    this.searchView = view;
  }

  setMenuView(view: boolean) {
    this.menuView = view;
  }

  setServerError(err: boolean) {
    this.serverError = err;
  }
}

export default new Store();
