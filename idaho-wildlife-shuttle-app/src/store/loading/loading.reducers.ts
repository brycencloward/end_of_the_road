import { createReducer, on } from "@ngrx/store";
import { delay } from "rxjs/operators";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = {
    show: false
}

const reducer = createReducer(initialState,
    on(show, () => {
        delay(4000);
        return {show: true};
    }),
    on(hide, () => {
        return {show: false};
    })
);

export function loadingReducer(state: LoadingState, action){
    return reducer(state, action);
}
