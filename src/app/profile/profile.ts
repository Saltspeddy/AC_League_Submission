import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any = null;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) { // ✅ Check for browser
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } else {
        window.location.href = '/login';
      }
    } else {
      console.warn('localStorage not available (SSR mode)');
    }
  }

  logout() {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('user');
  }
  this.isLoggedIn = false;
  window.location.href = '/login';
  } 


  updateProfile() {
    this.http.put(`http://localhost:5100/api/Users/${this.user.id}`, this.user)
      .subscribe({
        next: () => alert('Profile updated successfully!'),
        error: (err) => alert('Failed to update profile.')
      });
  }

  deleteProfile() {
    if (confirm('Are you sure?')) {
      this.http.delete(`http://localhost:5100/api/Users/${this.user.id}`)
        .subscribe({
          next: () => { alert('Profile deleted.'); this.logout(); },
          error: (err) => alert('Failed to delete profile.')
        });
    }
  }
}
