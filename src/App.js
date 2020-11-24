import React, {Component} from 'react';

import {
    Route,
    Switch,
    Redirect,
    withRouter,
} from "react-router-dom";

import { connect, Provider } from 'react-redux';
import { store } from './redux/store';
import { mapStateToProps, mapDispatchToProps } from "./redux/map";


import { Authors } from "./components/Authors/Authors";
import { Albums } from "./components/Albums/Albums";
import AlbumPhotoList from "./components/AlbumPhotoList/AlbumPhotoList";
import PhotoDetail from "./components/PhotoDetail/PhotoDetail";

const WrappedAuthorsComponent = connect(mapStateToProps("Authors"), mapDispatchToProps("Authors"))(Authors);
const WrappedAlbumsComponent = connect(mapStateToProps("Albums"), mapDispatchToProps("Albums"))(Albums);
const WrappedAlbumPhotoListComponent = connect(mapStateToProps("AlbumPhotoList"), mapDispatchToProps("AlbumPhotoList"))(AlbumPhotoList);
const WrappedPhotoDetailComponent = connect(mapStateToProps("PhotoDetail"), mapDispatchToProps("PhotoDetail"))(PhotoDetail);

class App extends Component {

    componentWillUpdate() {
        if ( !this.isModal() ) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        const { location } = this.props;
        const isModal = this.isModal();

        return (
            <div className="App">
                <Provider store={ store }>
                    <Switch>
                            <Route exact path='/authors' component={ WrappedAuthorsComponent } />
                            <Route exact path='/authors/albums/:authorId' component={ WrappedAlbumsComponent } />
                            <Route exact path='/authors/albums/:authorId/albumPhotos/:albumId/'>
                                <WrappedAlbumPhotoListComponent/>
                                {isModal ? <WrappedPhotoDetailComponent/> : null}
                            </Route>
                            <Redirect from='/' to='/authors'/>
                    </Switch>


                </Provider>
            </div>
        );

    }

    isModal() {
        const { location } = this.props;
        return location.state && location.state.modal;
    }
}

export default withRouter(App)