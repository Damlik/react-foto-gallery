import React from 'react';
import {Link, withRouter} from "react-router-dom";


import "./photoList.css"

class AlbumPhotoList extends React.Component {

    constructor(props) {
        super(props);

        this.authorId = this.props.match.params.authorId;
        this.albumId = this.props.match.params.albumId;

        this.getPhotos();
    }

    getPhotos() {
        if( !this.props.albumPhotos.length || !this.props.albumPhotos[this.albumId].length ) {
            this.props.getQuoteAction("GET_ALBUM_PHOTOS", "https://jsonplaceholder.typicode.com/albums/" + this.albumId + "/photos");
        }
    }

    render() {
        return (
            <div className="photolist">
                    {this.renderAlbumPhotos()}
                    <Link className="back_button" to={this.getAlbumsPageLink()}>К альбомам</Link>
            </div>
        );
    }

    renderAlbumPhotos() {
        let photos = [];

        if( this.props.albumPhotos.length && this.props.albumPhotos[this.albumId].length ) {
            this.props.albumPhotos[this.albumId].forEach((photo, index) => {
                photos.push(
                    <div key={photo.id} className="photolist_item">
                        <Link
                            to={
                                {
                                    pathname: '/authors/albums/' + this.authorId + '/albumPhotos/' + this.albumId,
                                    state: {modal: true},
                                    index: index
                                }
                            }
                        >
                            <img src={photo.thumbnailUrl} alt={photo.title}/>
                            <p>{photo.title}</p>
                        </Link>
                    </div>
                )
            } )
        }

        return photos
    }

    getAlbumsPageLink() {
        let authorId = this.props.match.params.authorId;
        let link = '/authors/albums/'+ authorId;
        return link;
    }

}

export default withRouter(AlbumPhotoList);