import { createAction } from "@ngrx/store";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers"
import { LoadingState } from "./LoadingState";

describe('Loading store', () => {
    it('should show', () => {
        const initialState: LoadingState = {show: false};
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({show: true});
    })

    it('should hide', () => {
        const initialState: LoadingState = {show: true};
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({show: false});
    })

    it('should maintain state if action is unknown', () => {
        const initialState: LoadingState = {show: true};
        const action = createAction("UNKNOWN")
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({show: true});
    })
})