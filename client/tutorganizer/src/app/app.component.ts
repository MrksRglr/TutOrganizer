import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {ContentContainerComponent} from './content-container/content-container.component';


@Component({
  selector: 'bs-root',
  imports: [NavbarComponent, ContentContainerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'tutorganizer';
}
