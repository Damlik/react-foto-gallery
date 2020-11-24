import { createStore, applyMiddleware  } from "redux";
import { rootReducer } from "./reducers";
import { initialState } from "./initialState";
import {httpMiddleware} from "./httpmiddleware";

export const store = createStore( rootReducer, initialState, applyMiddleware(httpMiddleware) );
