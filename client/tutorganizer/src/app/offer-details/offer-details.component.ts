import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {Offer} from '../shared/offer';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'bs-offer-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './offer-details.component.html',
  styles: ``
})
export class OfferDetailsComponent {

  ts = inject(TutOrganizerService);
  router = inject(Router);
  toastr = inject(ToastrService);

  offer = signal<Offer | undefined>(undefined);

  isEditing = false;
  editOfferControl = new FormControl('');

  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('tutorModalRef') tutorModalRef!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  openTutorModal() {
    this.tutorModalRef.nativeElement.showModal();
  }

  removeOffer() {
    if(this.offer()) {
      if (confirm('Möchtest du dieses Angebot wirklich löschen?')) {
        this.ts.removeOffer(<number>this.offer()?.id)
          .subscribe((res: any) => this.router.navigate(['/offers']));
        this.toastr.success('Angebot wurde gelöscht.');
      }
    }
  }

  startEdit() {
    if(this.offer()) {
      this.editOfferControl.setValue(this.offer()!.description ?? '');
      this.isEditing = true;
    }
  }

  cancelEdit()
  {
    this.isEditing = false;
  }

  saveEdit() {
    if (this.offer()) {
      const updatedDescription = this.editOfferControl.value;
      if (updatedDescription !== null && updatedDescription !== undefined) {
        const updatedOffer = {...this.offer()!, description: updatedDescription};
        this.offer.set(updatedOffer);
        this.ts.editOffer(updatedOffer.id, updatedOffer).subscribe({
          next: (res) => {this.isEditing = false;},
          error: (err) => {this.toastr.error
          ('Änderung speichern fehlgeschlagen.', 'TutOrganizer');}
        });
      }
    }
  }
}
