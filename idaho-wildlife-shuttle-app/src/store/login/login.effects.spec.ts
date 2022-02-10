import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginEffects } from "./login.effects";
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthService } from "src/app/services/auth/auth.service";

describe('Login effects', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error = {error: 'error'};
    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if (email == "error@email.com") {
                return throwError(error);
            }

            return of({});
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.get(LoginEffects);
    })

    it('should recover password with existing email return success', (done) => {
        actions$ = of(recoverPassword({email: "any@email.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());

            done();
        });
    });

    it('should recover password with non-existing email return an error', (done) => {
        actions$ = of(recoverPassword({email: "error@email.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));

            done();
        })
    })
})
