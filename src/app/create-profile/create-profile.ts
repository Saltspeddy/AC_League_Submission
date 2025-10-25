import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [FormsModule], // HttpClientModule no longer needed here
  templateUrl: './create-profile.html',
  styleUrls: ['./create-profile.css']
})
export class CreateProfile {
  username = '';
  faculty = '';
  score = 0;
  password= '';

  constructor(private usersService: UsersService) {}

  createProfile() {
    const newUser: User = {
      username: this.username,
      faculty: this.faculty,
      score: this.score,
      passwordHash: this.password
    };

    this.usersService.createUser(newUser).subscribe({
      next: (result) => {
        console.log('User created:', result);
        alert(`Profile created for ${result.username}!`);
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Error creating profile');
      }
    });
  }
}
