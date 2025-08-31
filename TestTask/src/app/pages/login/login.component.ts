import { Component, inject } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { Router } from '@angular/router'; 
import { NgIf } from '@angular/common'; 
import { AuthStore } from '../../services/auth/store/auth.store';
import { ApiService } from '../../services/auth/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    NgIf,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private api = inject(ApiService); 
  private auth = inject(AuthStore); 
  private router = inject(Router); 
  private fb = inject(FormBuilder); 
 
  loading = false; 
  error: string | null = null; 
 
  form = this.fb.group({ 
    username: ['admin', Validators.required], 
    password: ['123', Validators.required], 
  }); 
 
  submit() { 
    if (this.form.invalid) return; 
    const { username, password } = this.form.value as { username: string; password: string; }; 
    this.loading = true; 
    this.error = null; 
    
    this.api.login(username, password).subscribe({ 
      next: res => { 
        const token = res.key;
        if (token) {
          this.auth.setToken(token); 
          this.router.navigateByUrl('/news'); 
        } else {
          this.error = 'Ошибка сервера: токен не получен'; 
          this.loading = false; 
        }
      }, 
      error: error => { 
        console.error('Login error:', error); 
        this.error = 'Неверный логин или пароль'; 
        this.loading = false; 
      } 
    });
  } 
}