import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer)
]
