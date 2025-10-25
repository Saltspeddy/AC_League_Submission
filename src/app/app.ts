import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: 
  `
    <app-header/>
    <main>
      <router-outlet/>
    </main>
    `,

    styles:[
      `
        h1{
          background-color: red;
        }
      `
    ]
})
export class App {
  title = "my app"
}