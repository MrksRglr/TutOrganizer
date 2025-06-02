import { Component, inject, OnInit, signal } from '@angular/core';
import { Session } from '../shared/session';
import { TutOrganizerService } from '../shared/tut-organizer.service';
import { AuthenticationService } from '../shared/authentification.service';
import { SessionItemComponent } from '../session-item/session-item.component';

@Component({
  selector: 'bs-session-list',
  standalone: true,
  imports: [SessionItemComponent],
  templateUrl: './session-list.component.html',
  styles: ``
})
export class SessionListComponent implements OnInit {
  sessions = signal<Session[]>([]);
  filteredSessions = signal<Session[]>([]);

  ts = inject(TutOrganizerService);
  authService = inject(AuthenticationService);

  ngOnInit() {
    const currentUserId = this.authService.getCurrentUserId();
    const role = this.authService.user()?.role;

    this.ts.getAllSessions().subscribe((allSessions) => {
      this.sessions.set(allSessions);

      const filtered = allSessions.filter(session => {
        if (role === 'tutor') {
          return session.proposed_by.id === currentUserId;
        } else if (role === 'student') {
          return session.inquiry.user.id === currentUserId;
        }
        return false;
      });

      this.filteredSessions.set(filtered);
    });
  }

  isTutor(): boolean {
    return this.authService.user()?.role === 'tutor';
  }
}
