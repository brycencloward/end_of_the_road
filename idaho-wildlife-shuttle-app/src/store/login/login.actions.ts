import { createAction, props } from "@ngrx/store";

export const recoverPassword = createAction("[Recover password");
export const recoverPasswordSuccess = createAction("[Recover password] success");
export const recoverPasswordFail = createAction("[Recover password] fail", props<{error: any}>());
