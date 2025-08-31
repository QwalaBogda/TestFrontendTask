import { Injectable, signal } from '@angular/core';  
import { Position } from '../models/position.model';
import { ApiService } from './auth/api.service';

@Injectable({ providedIn: 'root' }) 
export class PositionsStore { 
  points = signal<Position[]>([]); 
  loading = signal(false); 
  error = signal<string | null>(null); 
 
  constructor(private api: ApiService) {} 
 
  load() { 
    this.loading.set(true); 
    this.error.set(null); 
    this.api.getPositions().subscribe({ 
      next: data => { 
        this.points.set(data); 
        this.loading.set(false); 
      }, 
      error: err => { 
        this.error.set('Не удалось загрузить точки (нужно войти?)'); 
        this.loading.set(false); 
      } 
    }); 
  } 
 
  add(p: Position) { 
    this.points.update(arr => [p, ...arr]); 
  } 
}