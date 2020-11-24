import React from 'react';
import { Link } from "react-router-dom"

import "./albums.css"

export class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.authorId = this.props.match.params.authorId;
    }

    componentDidMount() {
        this.getAlbums();
    }

    componentDidUpdate() {
        if(this.props.albums.length && this.props.albums[this.authorId].length && this.props.status != "waiting" ) {
            this.getPhotos();
        }
    }

    render() {
        return (
            <div className="albums">
                    {this.renderAlbums()}
                    <Link className="back_button" to={'/authors'}>К авторам</Link>
            </div>
        );
    }

    renderAlbums() {
        let albums = [];
        if(this.props.albums.length && this.props.albums[this.authorId].length) {
            for (let album of this.props.albums[this.authorId]) {
                albums.push(
                    <div className="albums_item" key={album.id}>
                        {this.renderAlbumImg(album.id)}
                        <Link
                            to={'/authors/albums/' + this.authorId + '/albumPhotos/' + album.id}
                        >
                            <p>
                                {album.title}
                            </p>
                        </Link>
                        {this.renderPhotosCount(album.id)}
                    </div>
                )
            }
        }

        return albums
    }

    renderAlbumImg(albumId) {
        if( this.props.albumPhotos[albumId] ) {
            return <img src={this.props.albumPhotos[albumId][0].thumbnailUrl} alt={this.props.albumPhotos[albumId][0].title} />
        }
    }

    renderPhotosCount(albumId) {
        if( this.props.albumPhotos[albumId] ) {
            return <span>photos count: {this.props.albumPhotos[albumId].length}</span>
        }
    }

    getAlbums() {
        if(!this.props.albums.length || !this.props.albums[this.authorId].length) {
            this.props.getQuoteAction("GET_ALBUM","https://jsonplaceholder.typicode.com/users/"+ this.authorId +"/albums");
        } else {
            this.getPhotos();
        }
    }

    getPhotos() {
        for(let album of this.props.albums[this.authorId]) {
            if(album && !this.props.albumPhotos[album.id]) {
                this.props.getQuoteAction( "GET_ALBUM_PHOTOS", "https://jsonplaceholder.typicode.com/albums/" + album.id + "/photos" );
                return;
            }
        }
    }

}