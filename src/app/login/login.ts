import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  apiUrl = 'http://localhost:5100/api/Users/login';

  constructor(private http: HttpClient) {}

  login() {
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }

    const loginData = {
      username: this.username,
      passwordHash: this.password // backend expects "PasswordHash"
    };

    this.http.post(this.apiUrl, loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        alert(`Welcome, ${response.username}!`);
        localStorage.setItem('user', JSON.stringify(response));
        window.location.href = '/profile'; // redirect to profile page
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password.');
      }
    });
  }
}
