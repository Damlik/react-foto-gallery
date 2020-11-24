import React from 'react';

import "./photoDetail.css";
import { Link, withRouter } from "react-router-dom";

class PhotoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.authorId = this.props.match.params.authorId;
        this.albumId = this.props.match.params.albumId;

        this.props.setCurrentPhotoIndex(this.props.location.index)
    }

    componentDidMount() {
        window.addEventListener('popstate', (event) => {
            this.props.history.push(this.getAlbumsPhotoLink(), {state: {modal: false}});
        }, false)
        document.addEventListener('keydown', (event) => {
            if(event.code === "ControlLeft" || event.code === "keyR" || event.code === "F5" ) {
                this.props.history.push(this.getAlbumsPhotoLink(), {state: {modal: false}});
            }
        })
    }

    render() {
        return (
                <div
                    className="modal-wrapper"
                >
                    <div className="modal">
                        {this.setPrevPhoto()}
                        {this.renderPhoto()}
                        {this.setNextPhoto()}
                        {this.renderClose()}
                    </div>
                </div>
        );
    }

    setPrevPhoto() {
        if (this.props.currentPhotoIndex !== null) {
            let photo = this.prevPhoto();
            return <Link
                onClick={this.props.setCurrentPhotoIndex.bind(this, photo.index)}
                className="prev"
                to={
                    {
                        pathname: '/authors/albums/' + this.authorId + '/albumPhotos/' + this.albumId,
                        state: { modal: true }
                    }
                }
            >
            </Link>
        }
    }

    prevPhoto() {
        let prevIndex = this.props.currentPhotoIndex - 1;

        if ( prevIndex < 0 ) {
            prevIndex = this.props.albumPhotos[this.albumId].length - 1;
        }

        let photo = this.getPhotoFromAlbums(prevIndex);
        photo.index = prevIndex;
        return photo;
    }

    setNextPhoto() {
        if (this.props.currentPhotoIndex !== null) {
            let photo = this.nextPhoto();
            return <Link
                onClick={this.props.setCurrentPhotoIndex.bind(this, photo.index)}
                className="next"
                to={
                    {
                        pathname: '/authors/albums/' + this.authorId + '/albumPhotos/' + this.albumId,
                        state: { modal: true }
                    }
                }></Link>
        }
    }

    nextPhoto() {
        let nextIndex = this.props.currentPhotoIndex + 1;

        if ( nextIndex >= this.props.albumPhotos[this.albumId].length ) {
            nextIndex = 0;
        }

        let photo = this.getPhotoFromAlbums(nextIndex);
        photo.index = nextIndex;
        return photo;
    }

    renderPhoto() {
        if (this.props.currentPhotoIndex !== null) {
            let photo = this.getPhotoFromAlbums(this.props.currentPhotoIndex);
            return <img src={photo.url} alt={photo.title}/>
        }
    }

    renderClose() {
        return <Link
            className="close"
            to={ {
            pathname: this.getAlbumsPhotoLink(),
            state: { modal: false }
        } }></Link>
    }

    getAlbumsPhotoLink() {
        let link = '/authors/albums/'+ this.authorId +'/albumPhotos/'+ this.albumId;
        return link;
    }

    getPhotoFromAlbums( index ) {
        return this.props.albumPhotos[this.albumId][index];
    }

}

export default withRouter(PhotoDetail);