import { Injectable, inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../../../environments/environment';
import { NewsItem } from '../../models/news.model';
import { Position } from '../../models/position.model';
import { map } from 'rxjs';
 
@Injectable({ providedIn: 'root' }) 
export class ApiService { 
  private http = inject(HttpClient); 
  private base = environment.apiBase; 
 
  login(username: string, password: string) { 
    return this.http.post<{ key: string }>(`${this.base}/api/auth/login/`, { username, password }); 
  } 
 
  getNews() { 
    return this.http.get<NewsItem[]>(`${this.base}/api/news/`); 
  } 
 
  getPositions() { 
    return this.http.get<Position[]>(`${this.base}/api/position/`); 
  } 
 
  addPosition(name: string, latitude: number, longitude: number) { 
    return this.http.post<Position>(`${this.base}/api/position/`, { name, latitude, longitude }); 
  } 

  validateToken() {
    return this.http.get<{valid: boolean}>('/api/auth/validate').pipe(
        map(response => response.valid));
  }
} 