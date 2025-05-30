import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'bs-content-container',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './content-container.component.html',
  styles: ``,
})

export class ContentContainerComponent implements OnInit {

  ngOnInit() {
  }
}
