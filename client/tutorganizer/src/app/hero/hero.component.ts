import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';

@Component({
  selector: 'bs-hero',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive

  ],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  authService = inject(AuthenticationService);
}
