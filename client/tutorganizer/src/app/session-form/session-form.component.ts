import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Timeslot} from '../shared/timeslot';
import {Inquiry} from '../shared/inquiry';
import {ActivatedRoute, Router} from '@angular/router';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'bs-session-form',
  imports: [
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './session-form.component.html',
  styles: ``
})
export class SessionFormComponent implements OnInit {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  ts = inject(TutOrganizerService);
  toastr = inject(ToastrService);
  router = inject(Router);

  sessionForm!: FormGroup;
  inquiry?: Inquiry;
  timeslots: Timeslot[] = [];
  errors: { [key: string]: string } = {};

  ngOnInit() {

    const inquiryId = Number(this.route.snapshot.queryParamMap.get('inquiryId'));

    this.sessionForm = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      duration: [null, Validators.required],
      comment: ['']
    });

    this.ts.getInquiryById(inquiryId).subscribe(inquiry => {
      this.inquiry = inquiry;
    });
  }

  addTimeslot() {
    if (this.timeslots.length >= 3) {
      this.errors['timeslot'] = 'Maximal 3 Terminvorschläge erlaubt.';
      return;
    }

    const date = this.sessionForm.value.date;
    const time = this.sessionForm.value.time;
    const duration = Number(this.sessionForm.value.duration);

    if (!date || !time || !duration) {
      this.errors['timeslot'] = 'Bitte Startzeit und Dauer angeben.';
      return;
    }

    const start = new Date(`${date}T${time}`);
    if (!start) {
      this.errors['timeslot'] = 'Ungültiges Datum oder Uhrzeit.';
      return;
    }

    const end = new Date(start.getTime() + duration * 3600000);

    this.timeslots.push({
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      session_id: null as any
    });

    this.sessionForm.get('date')?.reset();
    this.sessionForm.get('time')?.reset();
    this.sessionForm.get('duration')?.reset();
    delete this.errors['timeslot'];
  }

  submitForm() {
    if (!this.inquiry) {
      this.toastr.error('Anfrage nicht geladen.', 'TutOrganizer');
      return;
    }

    if (!this.inquiry.offer) {
      this.toastr.error('Ungültige Anfrage: Angebot fehlt.', 'TutOrganizer');
      return;
    }

    if (this.timeslots.length === 0) {
      this.errors['timeslot'] = 'Bitte mindestens einen Terminvorschlag hinzufügen.';
      return;
    }

    const sessionData = {
      offer_id: this.inquiry.offer.id,
      inquiry_id: this.inquiry.id,
      proposed_by: this.inquiry.offer.user.id,
      comment: this.sessionForm.value.comment || '',
      timeslots: this.timeslots.map(ts => ({
        start_time: formatDate(ts.start_time, 'yyyy-MM-dd HH:mm:ss', 'en'),
        end_time: formatDate(ts.end_time, 'yyyy-MM-dd HH:mm:ss', 'en'),
      }))
    };

    this.ts.createSession(sessionData).subscribe({
      next: () => {
        this.toastr.success('Session erfolgreich erstellt.', 'TutOrganizer');
        this.router.navigate(['/sessions']);
      },
      error: () => {
        this.toastr.error('Fehler beim Erstellen der Session.', 'TutOrganizer');
      }
    });
  }

  cancel() {
    this.sessionForm.reset();
    this.errors = {};
    this.router.navigate(['/inquiries']);
  }

  removeTimeslot(slotToRemove: Timeslot) {
    this.timeslots = this.timeslots.filter(slot => slot !== slotToRemove);
  }

}
