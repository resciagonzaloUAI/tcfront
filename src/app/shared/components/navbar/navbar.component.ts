import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  constructor(private readonly authService: AuthService) {}

  get isLogguedIn() {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
