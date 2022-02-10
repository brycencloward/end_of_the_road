import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";

@Injectable()
export class LoginEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    recoverPassword$ = createEffect(() => this.actions$.pipe(
        ofType(recoverPassword),
        switchMap((payload: {email: string}) => this.authService.recoverEmailPassword(payload.email).pipe(
            map(() => recoverPasswordSuccess()),
            catchError(error => of(recoverPasswordFail({error})))
        ))
    ))
}