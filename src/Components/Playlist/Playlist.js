import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  render(){
    return(
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange} />
        <Tracklist isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks} track={this.props.playlistTracks}/>
        <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
export default Playlist;
