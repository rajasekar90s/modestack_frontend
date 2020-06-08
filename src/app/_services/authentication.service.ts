import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentToken() {
      return localStorage.getItem('currentUser');
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(JSON.stringify(user));
                localStorage.setItem('currentUser', JSON.stringify(user.body));
                localStorage.setItem('currentToken', JSON.stringify(user.body.accessToken));
                this.currentUserSubject.next(user.body);
                return user;
            }));
    }

    postArticle(title: string, body: string ) {
        return this.http.post<any>(`${environment.apiUrl}/article`, { title, body })
            .pipe(map(article => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(JSON.stringify(article));
                return article;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
