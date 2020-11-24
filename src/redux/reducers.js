export const rootReducer = (state, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return {
                ...state,
                authors: action.payload
            }
        case "GET_AUTHORS_REQUESTED":
            return {
                ...state,
                status: "waiting"
            }
        case "GET_AUTHORS_RECEIVED":
            return {
                ...state,
                authors: action.payload,
                status: "received"
            }
        case "GET_AUTHORS_FAILED":
            return {
                ...state,
                error: action.payload,
                status: "waiting"
            }
        case "GET_ALBUM_REQUESTED":
            return {
                ...state,
                status: "waiting"
            }
        case "GET_ALBUM_RECEIVED":
            let authorId = action.payload[0].userId;
            state.albums[authorId] = action.payload;
            return {
                ...state,
                status: "received"
            }
        case "GET_ALBUM_FAILED":
            return {
                ...state,
                error: action.payload,
                status: "waiting"
            }
        case "GET_ALBUM_PHOTOS_REQUESTED":
            return {
                ...state,
                status: "waiting"
            }
        case "GET_ALBUM_PHOTOS_RECEIVED":
            let albumId = action.payload[0].albumId
            state.albumPhotos[albumId] = action.payload;
            return {
                ...state,
                status: "received"
            }
        case "GET_ALBUM_PHOTOS_FAILED":
            return {
                ...state,
                error: action.payload,
                status: "waiting"
            }
        case "SET_CURRENT_PHOTO_INDEX":
            return {
                ...state,
                currentPhotoIndex: action.payload,
            }
        default: return state
    }
};
