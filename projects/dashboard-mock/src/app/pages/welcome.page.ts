import {Component} from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <h1>Welcome to Dashboard Mock</h1>
    <div>
      <a routerLink="/dashboard">Start Now</a>
    </div>
    <div>
      <a routerLink="/login">Login</a>
    </div>
  `
})

export class WelcomePage{

}
