import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as ArticlesActions from '../actions/articles.actions';
import { Articles } from '../models/articles.model';


@Injectable({providedIn: 'root'})
export class HttpService {
    readonly ROOT_URL = 'http://localhost:3000/api';

    constructor(
        private http: HttpClient,
        private store: Store<AppState>) {}

    getArticles() {
         return this.http.get<Articles[]>(`${this.ROOT_URL}/articles`);
    }

    removeAll() {
        this.http.delete(`${this.ROOT_URL}/articles`)
        .subscribe(() => console.log('all articles deleted...'));
    }

    saveFavArticles(article: Articles) {
        this.http.post(`${this.ROOT_URL}/favorite/articles`, article)
            .subscribe(val => {
                console.log(`posts being saved...${val}`)
            })
    }

    getFavArticles() {
        return this.http.get(`${this.ROOT_URL}/favorite/articles`);
    }
}