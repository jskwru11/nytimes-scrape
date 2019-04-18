import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favArticles;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getFavArticles()
      .subscribe(articleResults => {
        this.favArticles = articleResults;
      });
  }

}
