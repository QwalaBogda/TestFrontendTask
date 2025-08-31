import { Component, OnInit, computed, signal } from '@angular/core'; 
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { Router } from '@angular/router';
import { NewsStore } from '../../services/news/news.store';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    MatCardModule,
    MatButtonToggleModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  view = signal<'list' | 'grid'>('grid'); 
 
  constructor(
    public store: NewsStore,
    private router: Router 
  ) {} 
 
  ngOnInit() { 
    this.store.load(); 
  } 
 
  toggle() { 
    this.view.set(this.view() === 'list' ? 'grid' : 'list'); 
  } 
 
  pickTitle(n: any) { 
    return n.title || n.name || 'Без названия'; 
  } 

  pickText(n: any) { 
    return n.content || n.text || n.body || n.description || ''; 
  }

  openNews(news: any) {
  const newsId = news.id || news._id;
    if (newsId) {
      this.router.navigate(['/news', newsId]);
    } else {
      console.error('У новости нет идентификатора', news);
    }
  }
}