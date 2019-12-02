import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/Gabe/songs"
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
    console.log("hello from  SongService");
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  getMySongs() {
    _sandBox
      .get()
      .then(res => {
        let results = res.data.data.map(rawData => new Song(rawData));
        store.commit("playlist", results);
        //TODO What are you going to do with this result
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  addSong(id) {
    console.log("add button service");
    let chosenSong = store.State.songs.find(song => song._id == id);
    _sandBox
      .post("", chosenSong)
      .then(res => {
        this.getMySongs();
      })
      .catch(err => {
        console.log(err);
      });
  }
  //TODO you only have an id, you will need to find it in the store before you can post it
  //TODO After posting it what should you do?

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    debugger;
    // let deletedSong = store.State.playlist.filter(song => song._id != id);
    _sandBox
      .delete(`${id}`)
      .then(res => {
        this.getMySongs();
      })
      .catch(err => {
        console.log(err);
      });

    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
