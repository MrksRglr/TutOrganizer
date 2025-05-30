import {Component, ElementRef, input, signal, ViewChild} from '@angular/core';
import {Offer} from '../shared/offer';

@Component({
  selector: 'bs-offer-details',
  standalone: true,
  imports: [],
  templateUrl: './offer-details.component.html',
  styles: ``
})
export class OfferDetailsComponent {

  // @Input() offer: Offer | undefined;
  offer = signal<Offer | undefined>(undefined);
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

}
