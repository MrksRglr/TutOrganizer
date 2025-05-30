import {Component, ViewChild} from '@angular/core';
import {Offer} from '../shared/offer';
import {OffersComponent} from '../offer-item/offer-item.component';
import {OfferDetailsComponent} from '../offer-details/offer-details.component';

@Component({
  selector: 'bs-offer-list',
  standalone: true,
  imports: [
    OffersComponent,
    OfferDetailsComponent
  ],
  templateUrl: './offer-list.component.html',
  styles: ``
})
export class OfferListComponent {
  offers: Offer[] = [
    { id: 1, description: "JavaScript für Anfänger" }
  ]

  @ViewChild(OfferDetailsComponent) detailsComponent!: OfferDetailsComponent;

  onShowDetails(offer: Offer) {
    this.detailsComponent.offer.set(offer);
    this.detailsComponent.open();
  }

}
