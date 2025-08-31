import { Injectable, signal } from '@angular/core'; 
import { ApiService } from '../auth/api.service';
import { NewsItem } from '../../models/news.model';
 
@Injectable({ providedIn: 'root' }) 
export class NewsStore { 
  items = signal<NewsItem[]>([]); 
  loading = signal(false); 
  error = signal<string | null>(null); 
 
  constructor(private api: ApiService) {} 
 
  load() { 
    this.loading.set(true); 
    this.error.set(null); 
    this.api.getNews().subscribe({ 
      next: data => { 
        this.items.set(data); 
        this.loading.set(false); 
      }, 
      error: err => { 
        this.error.set('Не удалось загрузить новости'); 
        this.loading.set(false); 
      } 
    }); 
  } 
} 