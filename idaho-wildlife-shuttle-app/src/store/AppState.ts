import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
}