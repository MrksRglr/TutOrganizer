import {Component, signal} from '@angular/core';
import {Timeslot} from '../shared/timeslot';

@Component({
  selector: 'bs-timeslot',
  imports: [],
  templateUrl: './timeslot.component.html',
  styles: ``
})
export class TimeslotComponent {
  timeslot = signal<Timeslot>;

}
