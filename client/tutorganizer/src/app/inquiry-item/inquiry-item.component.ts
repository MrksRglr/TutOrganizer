import {Component, computed, EventEmitter, inject, input, Output} from '@angular/core';
import {Inquiry} from '../shared/inquiry';
import {AuthenticationService} from '../shared/authentification.service';
import {Router, RouterLink} from '@angular/router';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'bs-inquiry-item',
  imports: [
    RouterLink
  ],
  templateUrl: './inquiry-item.component.html',
  styles: ``
})
export class InquiryItemComponent {
  inquiry = input.required<Inquiry>();
  isTutor = computed(() => this.authService.user()?.role === 'tutor');

  authService = inject(AuthenticationService);
  ts = inject(TutOrganizerService);
  router = inject(Router);
  toastr = inject(ToastrService);

  @Output() inquiryRemoved = new EventEmitter();

  removeInquiry() {
    if (this.inquiry()) {
      if (confirm('Möchtest du diese Anfrage wirklich löschen?')) {
        this.ts.removeInquiry(<number>this.inquiry()?.id)
          .subscribe(() => {
            this.toastr.success('Anfrage wurde gelöscht.');
            this.inquiryRemoved.emit();
          });
      }
    }
  }

}
