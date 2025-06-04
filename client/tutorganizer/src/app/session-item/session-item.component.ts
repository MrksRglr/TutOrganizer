import {Component, effect, inject, input, output, signal} from '@angular/core';
import { Session } from '../shared/session';
import { AuthenticationService } from '../shared/authentification.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'bs-session-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    NgClass // Für dynamische CSS-Klassen
  ],
  providers: [DatePipe],
  templateUrl: './session-item.component.html',
  styles: ``
})
export class SessionItemComponent {

  session = input<Session | undefined>(undefined);
  localSession = signal<Session | undefined>(this.session());

  // Reaktives Verhalten: Wenn sich die Eingabe ändert, wird `localSession` aktualisiert
  constructor() {
    effect(() => {
      if(this.session()) {
        this.localSession.set(this.session());
      }
    });
  }

  sessionDeleted = output<number>();
  sessionAccepted = output<number>();
  sessionRejected = output<number>();

  authService = inject(AuthenticationService);
  ts = inject(TutOrganizerService);
  toastr = inject(ToastrService);
  router = inject(Router);
  pipe = inject(DatePipe);

  isEditing = false;
  editTimeslotsControl = new FormControl('');
  editCommentControl = new FormControl('');

  isTutor(): boolean {
    return this.authService.user()?.role === 'tutor';
  }

  isStudent(): boolean {
    return this.authService.user()?.role === 'student';
  }

  removeSession() {
    if(this.session()) {
      if (confirm('Möchtest du diesen Termin wirklich löschen?')) {
        this.ts.removeSession(this.session()!.id).subscribe({
          next: () => {
            this.sessionDeleted.emit(this.session()!.id);
            this.toastr.success('Termin wurde gelöscht.');
          },
          error: () => {
            this.toastr.error('Löschen fehlgeschlagen.', 'TutOrganizer');
          }
        });
      }
    }
  }

  acceptSession() {
    const sessionValue = this.localSession();
    if (!sessionValue) return;

    const updatedSession: Session = {
      ...sessionValue,
      status: 'accepted'
    };

    this.ts.editSession(updatedSession.id, updatedSession).subscribe({
      next: () => {
        this.localSession.set(updatedSession);
        this.toastr.success('Termin wurde fixiert.');
        this.sessionAccepted.emit(updatedSession.id); // falls außerhalb was reagieren soll
      },
      error: () => this.toastr.error('Termin fixieren fehlgeschlagen.')
    });

    this.sessionAccepted.emit(this.session()!.id);
  }

  rejectSession() {
    const sessionValue = this.localSession();
    if (!sessionValue) return;

    const updatedSession: Session = {
      ...sessionValue,
      status: 'rejected'
    };

    this.ts.editSession(updatedSession.id, updatedSession).subscribe({
      next: () => {
        this.localSession.set(updatedSession);
        this.toastr.success('Terminvorschlag wurde abgelehnt.');
        this.sessionRejected.emit(updatedSession.id);
      },
      error: () => this.toastr.error('Terminvorschlag ablehnen fehlgeschlagen.')
    });

    this.sessionRejected.emit(this.session()!.id);
  }

  // Speichert bearbeitete Kommentar- und Zeitdaten.
  // Überträgt aktualisierte Werte ans Backend und setzt localSession.
  saveEdit() {
    if (this.session()) {

      const originalTimeslots = this.session()!.timeslots;

      const slotsStrings = this.editTimeslotsControl.value!
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const updatedTimeslots = slotsStrings
        .map((slot, id) => {
          const [start_time, end_time] = slot.split('–')
            .map(stringPortion => stringPortion.trim());
          return {...originalTimeslots[id], start_time, end_time};
        });

      const updatedComment = this.editCommentControl.value ?? '';

      const updatedSession: Session = {
        ...this.localSession()!,
        timeslots: updatedTimeslots,
        comment: updatedComment};

      this.localSession.set(updatedSession);

      this.ts.editSession(updatedSession.id, updatedSession).subscribe({
        next: () => {this.isEditing = false;
          this.toastr.success('Änderungen wurden gespeichert.');},
        error: () => {this.toastr.error
          ('Änderung speichern fehlgeschlagen.', 'TutOrganizer');}
        });
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  // Aktiviert den Bearbeitungsmodus und lädt bestehende Daten in Formularfelder.
  startEdit() {
    if (this.session()) {
      this.editCommentControl.setValue(this.session()!.comment ?? '');
      const slots = (this.session()!.timeslots ?? []).map(slot => {
        const start = this.pipe.transform(slot.start_time, 'yyyy-MM-ddTHH:mm')!;
        const end   = this.pipe.transform(slot.end_time,   'yyyy-MM-ddTHH:mm')!;
        return `${start} – ${end}`;
      });
      this.editTimeslotsControl.setValue(slots.join('\n'));

      this.isEditing = true;
    }
  }

  sessionCompleted() {
    const sessionValue = this.localSession();
    if (!sessionValue) return;

    const updatedSession: Session = {
      ...sessionValue,
      successfully_completed: !sessionValue.successfully_completed
    };

    this.ts.editSession(updatedSession.id, updatedSession).subscribe({
      next: () => {
        this.localSession.set(updatedSession);
      }
    });
  }
}
