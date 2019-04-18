import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/articles.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppendPipe } from './shared/append.pipe';
import { MaterialModule } from './shared/material.module';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppendPipe,
    FavoritesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    MaterialModule,
    StoreModule.forRoot({
      article: reducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
