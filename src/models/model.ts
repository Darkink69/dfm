export interface channelDataProps {
  id: number;
  length: number;
  title: string;
  version: string;
  display_title: string;
  display_artist: string;
  track: string;
  mix: boolean;
  //   artists: ArtistElement[];
  release: null;
  content_accessibility: number;
  preview_accessibility: number;
  retail_accessibility: number;
  //   retail: Retail;
  //   release_date: null;
  waveform_url: string;
  //   track_container_id: null;
  isrc: string;
  //   parental_advisory: null;
  details_url: string;
  //   images: Images;
  //   votes: Votes;
  //   content: Content;
  //   preview: null;
  is_show_asset: boolean;
  //   artist: PurpleArtist;
  asset_url: string;
}

// export interface PurpleArtist {
//   id: number;
//   name: string;
//   asset_url: null;
//   images: Retail;
// }

// export interface Retail {}

// export interface ArtistElement {
//   id: number;
//   name: string;
//   slug: string;
//   images: Retail;
//   type: string;
// }

// export interface Content {
//   interactive: boolean;
//   length: number;
//   offset: null;
//   assets: Asset[];
// }

// export interface Asset {
//   content_format_id: number;
//   content_quality_id: number;
//   size: number;
//   url: string;
// }

// export interface Images {
//   default: string;
// }

// export interface Votes {
//   up: number;
//   down: number;
//   who_upvoted: WhoVoted;
//   who_downvoted: WhoVoted;
// }

// export interface WhoVoted {
//   size: number;
//   hashes: number;
//   seed: number;
//   bits: number[];
//   items: null;
// }
