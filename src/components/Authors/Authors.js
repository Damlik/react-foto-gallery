import React from 'react';
import { Link } from "react-router-dom"

import "./authors.css"

export class Authors extends React.Component {

    componentDidMount() {
        this.getAuthors()
    }

    componentDidUpdate() {
        if(this.props.authors.length && this.props.status != "waiting" ) {
            this.getAlbums();
        }
    }

    render() {
        return (
            <div className="authors">
                {this.renderAuthors()}
            </div>
        );
    }

    renderAuthors() {
        let authors = [];

        let albumId = 1;
        let authorId = 1;

        for(let author of this.props.authors) {
            authors.push(
                <div className="authors_item" key={author.id}>
                    {this.renderAuthorImg(albumId)}
                    <Link to={'/authors/albums/' + author.id}>
                        <p>{author.name}</p>
                    </Link>
                    {this.renderAlbumsCount(authorId)}
                </div>
            )
            albumId = albumId + 10;
            authorId = authorId + 1;
        }

        return authors
    }

    renderAuthorImg(albumId) {
        if( this.props.albumPhotos[albumId] ) {
            return <img src={this.props.albumPhotos[albumId][0].thumbnailUrl} alt={this.props.albumPhotos[albumId][0].title} />
        }
    }

    renderAlbumsCount(authorId) {
        if( this.props.albums[authorId] ) {
            return <span> album count: {this.props.albums[authorId].length}</span>
        }
    }

    getAuthors() {
        if( this.props.authors.length === 0 ) {
            this.props.getQuoteAction( "GET_AUTHORS", "https://jsonplaceholder.typicode.com/users/" );
        }
    }

    getAlbums() {
        for(let author of this.props.authors) {
            if(!this.props.albums[author.id]) {
                this.props.getQuoteAction( "GET_ALBUM", "https://jsonplaceholder.typicode.com/users/" + author.id + "/albums" );
                return;
            }
        }

        if(this.props.albums.length && this.props.status != "waiting") {
            this.getPhotos();
        }
    }

    getPhotos() {
        for(let userAlbums of this.props.albums) {
            if( userAlbums ) {
                if(!this.props.albumPhotos[userAlbums[0].id]) {
                    this.props.getQuoteAction( "GET_ALBUM_PHOTOS", "https://jsonplaceholder.typicode.com/albums/" + userAlbums[0].id + "/photos" );
                    return;
                }
            }
        }
    }

}