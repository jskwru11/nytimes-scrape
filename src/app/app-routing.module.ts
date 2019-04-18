import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';

const appRoutes = [
    {path: '', component: HomeComponent},
    {path: 'favorites', component: FavoritesComponent}
];


@NgModule({
    imports: [
    RouterModule.forRoot(appRoutes)
    ],
    
exports: [
    RouterModule
]
})

export class AppRoutingModule {

}