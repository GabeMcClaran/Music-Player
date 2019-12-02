import store from "../store.js";
import SongService from "../Services/SongsService.js";
import Song from "../Models/Song.js";
import service from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = "";
  let songs = store.State.songs;
  songs.forEach(song => (template += song.Template));

  document.querySelector("#songs").innerHTML = template;
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  let playlist = store.State.playlist;
  playlist.forEach(song => (template += song.playlistTemplate));

  document.querySelector("#playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your subscribers
    console.log("Hello from songs Controller");
    store.subscribe("playlist", _drawPlaylist);
    store.subscribe("songs", _drawResults);
    _drawResults();
    _drawPlaylist();
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    console.log("add button controller");
    SongService.addSong(id);
    _drawPlaylist();
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    SongService.removeSong(id);
    _drawPlaylist();
  }
}
