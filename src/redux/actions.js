function httpAction(action) {
    const httpActionTemplate = {
        type: "",
        endpoint: null,
        verb: "GET",
        payload: null,
        headers: []
    };

    return {
        HTTP_ACTION: Object.assign({}, httpActionTemplate, action)
    };
}

export function getQuoteAction( type,url ) {
    return httpAction({
        type: type,
        endpoint: url
    });
}

export function setCurrentPhotoIndex( index ) {
    return {
        type: "SET_CURRENT_PHOTO_INDEX",
        payload: index,
    }
}

export function setModalWindow( state ) {
    return {
        type: "SET_MODAL_WINDOW",
        payload: state,
    }
}

