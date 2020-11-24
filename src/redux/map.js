import { bindActionCreators } from "redux";
import { getQuoteAction, setCurrentPhotoIndex } from './actions';


export const mapStateToProps = ( component ) => {
    switch( component ) {
        case "Authors": {
            return function ( state ) {
                return {
                    authors: state.authors,
                    albums: state.albums,
                    albumPhotos: state.albumPhotos,
                    currentPhotoIndex: state.currentPhotoIndex,
                    status: state.status,
                };
            }
        }
        case "Albums": {
            return function ( state ) {
                return {
                    authors: state.authors,
                    albums: state.albums,
                    albumPhotos: state.albumPhotos,
                    currentPhotoIndex: state.currentPhotoIndex,
                    status: state.status,
                };
            }
        }
        case "AlbumPhotoList": {
            return function ( state ) {
                return {
                    authors: state.authors,
                    albums: state.albums,
                    albumPhotos: state.albumPhotos,
                    currentPhotoIndex: state.currentPhotoIndex,
                    status: state.status,
                }
            }
        }
        case "PhotoDetail": {
            return function ( state ) {
                return {
                    authors: state.authors,
                    albums: state.albums,
                    albumPhotos: state.albumPhotos,
                    currentPhotoIndex: state.currentPhotoIndex,
                    status: state.status,
                }
            }
        }
        default: return undefined;
    }
}

export const mapDispatchToProps = ( component ) => {
    switch( component ) {
        case "Authors": return function( dispatch ) {
            return {
                getQuoteAction: bindActionCreators( getQuoteAction, dispatch )
            };
        };
        case "Albums": return function( dispatch ) {
            return {
                getQuoteAction: bindActionCreators( getQuoteAction, dispatch )
            };
        };
        case "AlbumPhotoList": return function( dispatch ) {
            return {
                getQuoteAction: bindActionCreators( getQuoteAction, dispatch )
            };
        };
        case "PhotoDetail": return function( dispatch ) {
            return {
                getQuoteAction: bindActionCreators( getQuoteAction, dispatch ),
                setCurrentPhotoIndex: bindActionCreators( setCurrentPhotoIndex, dispatch )
            };
        };
        default: return undefined;
    }
}