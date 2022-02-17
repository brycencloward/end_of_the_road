import { AppState } from "../AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        isRecoveredPassword: false,
        isRecoveringPassword: false
    },
    register: {
        error: null,
        isRegistered: false,
        isRegistering: false
    }
}
