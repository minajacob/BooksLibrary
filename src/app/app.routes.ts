import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { SearchComponent } from './modules/search/search.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'search', component: SearchComponent },
];
