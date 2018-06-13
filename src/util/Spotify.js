let userToken;
const clientID = '8b645fa5237b4d7188ecad29fce57780';
const redirectURI = 'https://time_to_jam.surge.sh';
let Spotify = {
  getAccessToken: function() {
    const url = window.location.href;
    const token = url.match(/access_token=([^&]*)/);
    const time = url.match(/expires_in=([^&]*)/);
    if(userToken){
      return userToken;
    }else if(token && time){
      userToken = token[1];
      let time_expire = time[1];
      window.setTimeout(() => userToken = '', time_expire * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },
  search: function(search){
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${search}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonresponse => {
      if(jsonresponse.tracks){
        return jsonresponse.tracks.map(track =>{
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri
          }
        })
      }
    })
  },
  savePlaylist: function(playlistName, trackUris){
    this.getAccessToken();
    if(playlistName && trackUris){
      let access_token = userToken;
      let headers = {
        Authorization: `Bearer ${access_token}`
      }
      let userID;
      return fetch(`https://api.spotify.com/v1/me`, {
        headers: headers
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      }).then(() => {
        return fetch(`https://api.spotify.com/v1/me/v1/users/${userID}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(playList => {
          return playList.json();
        }).then(jsonResponse => {
          let playlistID = jsonResponse.id;
        })
      })
    } else{
      return;
    }

  }
};

module.exports = Spotify;
