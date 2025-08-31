import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { authGuard } from './services/auth/auth.guard';
import { MapComponent } from './pages/map/map.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'news'},
    { path: 'login', component: LoginComponent },
    { path: 'news', component: NewsComponent },
    { path: 'map', component: MapComponent, canActivate: [authGuard] },
    { path: 'news/:id', component: NewsDetailComponent }
];
