import {Component, effect, inject, input, output, signal} from '@angular/core';
import { Session } from '../shared/session';
import { AuthenticationService } from '../shared/authentification.service';
import {DatePipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'bs-session-item',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './session-item.component.html',
  styles: ``
})
export class SessionItemComponent {

  session = input<Session | undefined>(undefined);
  localSession = signal<Session | undefined>(this.session());

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

  isEditing = false;
  editSessionControl = new FormControl('');

  isTutor(): boolean {
    return this.authService.user()?.role === 'tutor';
  }

  isStudent(): boolean {
    return this.authService.user()?.role === 'student';
  }

  removeSession() {
    if(this.session()) {
      if (confirm('Möchtest du dieses Angebot wirklich löschen?')) {
        this.ts.removeSession(<number>this.session()?.id)
          .subscribe((res: any) => this.router.navigate(['/offers']));
        this.toastr.success('Angebot wurde gelöscht.');
      }
    }
  }

  acceptSession() {
    this.sessionAccepted.emit(this.session()!.id);
  }

  rejectSession() {
    this.sessionRejected.emit(this.session()!.id);
  }

  saveEdit() {
    if (this.session()) {
      const updatedComment = this.editSessionControl.value;
      if (updatedComment !== null && updatedComment !== undefined) {
        const updatedSession = {...this.localSession()!, description: updatedComment};
        this.localSession.set(updatedSession);
        this.ts.editSession(updatedSession.id, updatedSession).subscribe({
          next: (res) => {this.isEditing = false;},
          error: (err) => {this.toastr.error
          ('Änderung speichern fehlgeschlagen.', 'TutOrganizer');}
        });
      }
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  startEdit() {
    if(this.session()) {
      this.editSessionControl.setValue(this.session()!.comment ?? '');
      this.isEditing = true;
    }
  }
}
