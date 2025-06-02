import {Component, input} from '@angular/core';
import {Session} from '../shared/session';

@Component({
  selector: 'bs-session-item',
  imports: [],
  templateUrl: './session-item.component.html',
  styles: ``
})
export class SessionItemComponent {

  session = input.required<Session>();

}
