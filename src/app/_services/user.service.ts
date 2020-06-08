import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, Article } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Article[]>(`${environment.apiUrl}/article/list`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/register`, user);
    }
}
