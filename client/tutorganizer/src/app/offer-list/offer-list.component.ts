import {Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {Offer} from '../shared/offer';
import {OfferItemComponent} from '../offer-item/offer-item.component';
import {OfferDetailsComponent} from '../offer-details/offer-details.component';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {RouterLink} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'bs-offer-list',
  standalone: true,
  imports: [
    OfferItemComponent,
    OfferDetailsComponent,
    RouterLink
  ],
  templateUrl: './offer-list.component.html',
  styles: ``
})
export class OfferListComponent implements OnInit {
  offers = signal<Offer[]>([]);

  ts = inject(TutOrganizerService);
  authService = inject(AuthenticationService);
  cdRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.ts.getAllOffers().subscribe(res => this.offers.set(res));
  }

  @ViewChild(OfferDetailsComponent) detailsComponent!: OfferDetailsComponent;

  onShowDetails(offer: Offer) {
    this.detailsComponent.offer.set(offer);
    this.detailsComponent.open();
    this.cdRef.detectChanges();
  }

}
