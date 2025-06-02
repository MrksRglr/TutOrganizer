import {Component, input, output} from '@angular/core';
import {Offer} from '../shared/offer';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'bs-offer-item',
  standalone: true,
  imports: [
    SlicePipe
  ],
  templateUrl: './offer-item.component.html',
  styles: ``
})
export class OfferItemComponent {
  offer = input.required<Offer>();

  detailsRequested = output<Offer>();

  showDetails(offer: Offer) {
    this.detailsRequested.emit(offer);
  }

}
