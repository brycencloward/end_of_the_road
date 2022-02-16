import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../login/AppInitialState";
import { register, registerFail, registerSuccess } from "./register.actions";
import { RegisterState } from "./RegisterState";

const initialState = AppInitialState.register;

const reducer = createReducer(initialState,
    on(register, state => {
        return {
            ...state,
            error: null,
            isRegistered: false,
            isRegistering: true
        }
    }),
    on(registerSuccess, state => {
        return {
            ...state,
            isRegistered: true,
            isRegistering: false
        }
    }),
    on(registerFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isRegistered: false,
            isRegistering: false
        }
    })    
);

export function registerReducer(state: RegisterState, action) {
    return reducer(state, action);
}
