import { TestBed } from '@angular/core/testing'; 
import { NewsComponent } from './news.component'; 
import { NewsStore } from '../../services/news/news.store';
 
describe('NewsComponent', () => { 
  beforeEach(async () => { 
    await TestBed.configureTestingModule({ 
      imports: [NewsComponent], 
      providers: [NewsStore] 
    }).compileComponents(); 
  }); 
 
  it('should create', () => { 
    const fixture = TestBed.createComponent(NewsComponent); 
    const comp = fixture.componentInstance; 
    expect(comp).toBeTruthy(); 
  }); 
}); 