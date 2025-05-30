import {Component, input, OnInit, output} from '@angular/core';
import {Offer} from '../shared/offer';

@Component({
  selector: 'bs-offer-item',
  standalone: true,
  imports: [],
  templateUrl: './offer-item.component.html',
  styles: ``
})
export class OffersComponent implements OnInit {

  // @Input() offer!: Offer;
  offer = input.required<Offer>();
  // @Output() detailsRequested = new EventEmitter<any>();
detailsRequested = output<Offer>();

  showDetails(offer: Offer) {
    this.detailsRequested.emit(offer);
  }

  ngOnInit() {

  }
}
