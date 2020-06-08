import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User,Article } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    articles: Article[];
    items: [];
    pageOfItems: Array<any>;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(articles => {
            this.loading = false;
            this.articles = articles;
            console.log(articles.length);
            //this.items = Array(17).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${x + i}`}));
        });

    }

    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
}
