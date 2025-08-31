import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsStore } from '../../services/news/news.store';
import { DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatCardModule,
    MatButtonModule,
    NgIf
],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
  providers: [Location]
})
export class NewsDetailComponent implements OnInit {
  newsItem: any;

  constructor(
    private route: ActivatedRoute,
    private newsStore: NewsStore,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsItem = this.newsStore.items().find(item => item.id === +id);
    }
  }

  goBack() {
    this.router.navigate(['/news']); 
  }
}