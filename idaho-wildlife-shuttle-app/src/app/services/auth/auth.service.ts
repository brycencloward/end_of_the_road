import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (email == "error@email.com") {
          observer.error({message: "Email not found"});
        }
        observer.next();

        observer.complete();
      }, 3000)
    })
  }
}
