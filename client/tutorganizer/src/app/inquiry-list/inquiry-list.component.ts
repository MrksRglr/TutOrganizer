import {Component, inject, OnInit, signal} from '@angular/core';
import {Inquiry} from '../shared/inquiry';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {AuthenticationService} from '../shared/authentification.service';
import {InquiryItemComponent} from '../inquiry-item/inquiry-item.component';

@Component({
  selector: 'bs-inquiry-list',
  standalone: true,
  imports: [
    InquiryItemComponent // Einbindung der Kindkomponente zur Darstellung einzelner Anfragen
  ],
  templateUrl: './inquiry-list.component.html',
  styles: ``
})
export class InquiryListComponent implements OnInit {

  // Signals zur Speicherung aller Anfragen vom Backend
  // inquiries -> filteredInquiries -> Template
  inquiries = signal<Inquiry[]>([]);
  filteredInquiries = signal<Inquiry[]>([]);

  ts = inject(TutOrganizerService);
  authService = inject(AuthenticationService);

  // Lädt alle Anfragen vom Backend und filtert sie nach User-Rolle
  loadInquiries() {
    const currentUserId = this.authService.getCurrentUserId();
    const role = this.authService.user()?.role;

    this.ts.getAllInquiries().subscribe((allInquiries) => {
      this.inquiries.set(allInquiries);

      const filtered = allInquiries.filter(inquiry => {
        const isPending = inquiry.status === 'pending';
        if (role === 'tutor') {
          return inquiry.offer?.user?.id === currentUserId && isPending;
        } else if (role === 'student') {
          return inquiry.user?.id === currentUserId && isPending;
        }
        return false;
      });

      this.filteredInquiries.set(filtered);
    });
  }

  ngOnInit() {
    this.loadInquiries();
  }
}
