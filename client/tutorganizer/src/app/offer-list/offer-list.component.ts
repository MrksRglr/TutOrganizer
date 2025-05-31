import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {Offer} from '../shared/offer';
import {OffersComponent} from '../offer-item/offer-item.component';
import {OfferDetailsComponent} from '../offer-details/offer-details.component';
import {TutOrganizerService} from '../shared/tut-organizer.service';

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
export class OfferListComponent implements OnInit {

  offers = signal<Offer[]>([]);

  ts = inject(TutOrganizerService);

  ngOnInit() {
    this.ts.getAllOffers().subscribe(res => this.offers.set(res));
  }

  @ViewChild(OfferDetailsComponent) detailsComponent!: OfferDetailsComponent;

  onShowDetails(offer: Offer) {
    this.detailsComponent.offer.set(offer);
    this.detailsComponent.open();
  }

}
