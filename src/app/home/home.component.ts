import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Articles } from '../models/articles.model';
import * as ArticleActions  from '../actions/articles.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articlesMissing: boolean = true;
  scrapedArticles: Observable<Articles[]>;
  isFavorite: boolean = false;
  savedArticle: Articles;

  constructor(
    private http:  HttpService,
    private store: Store<AppState>) { }

  ngOnInit() {
  

  }

  onScrape() {
    this.articlesMissing = false;
    this.http.getArticles()
      .subscribe(async res => {
        const data: any = await res;
        data.forEach(element => {
            this.store.dispatch(new ArticleActions.AddArticles(element));
        });
      
        this.scrapedArticles = this.store.select('article');
    });
   
  }

  onFav(idx: number) {
    this.store.dispatch(new ArticleActions.UpdateArticles(idx));
    this.store.select('article')
    .subscribe(articles => {
      // this.savedArticle = articles.filter(article => article === articles[idx])
      console.log(articles[idx].link);
      this.savedArticle = {
        link: articles[idx].link,
        title: articles[idx].title,
        body: articles[idx].body,
        isFavorite: articles[idx].isFavorite

      };
      this.http.saveFavArticles(this.savedArticle);
      
    });
    console.log('hey did it work...');
    console.log(this.savedArticle);

  }

  onClear() {
    this.store.dispatch(new ArticleActions.ClearArticles());
    this.http.removeAll();
    this.articlesMissing = true;
  }

  onPostFav() {

  }

}
