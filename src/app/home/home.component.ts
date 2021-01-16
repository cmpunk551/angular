import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

 interface IUser {
     userId: string
     firstName: string
     lastName: string
     phoneNumber: string
     emailAddress: string
}

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    pager = {};
    pageOfItems: IUser[] = [];

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
    }

    private loadPage(page) {
        this.http.get<any>(`/api/items?page=${page}`).subscribe(response=> {
            console.log(response);
            this.pager = response.pager;
            this.pageOfItems = response.pageOfItems as IUser[];
            console.log(this.pageOfItems);
        });
    }
}
