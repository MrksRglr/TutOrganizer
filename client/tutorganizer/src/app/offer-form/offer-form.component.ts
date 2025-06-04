import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TutOrganizerService} from '../shared/tut-organizer.service';
import {Course} from '../shared/course';
import {ToastrService} from 'ngx-toastr';
import {CreateOfferDto} from '../shared/dto/create-offer.dto';
import {AuthenticationService} from '../shared/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bs-offer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './offer-form.component.html',
  styles: ``
})
export class OfferFormComponent implements OnInit {
  fb = inject(FormBuilder);
  ts = inject(TutOrganizerService);
  toastr = inject(ToastrService);
  authService = inject(AuthenticationService);
  router = inject(Router);

  offerForm!: FormGroup;
  courses: Course[] = [];
  selectedCourse?: Course;
  errors: { [key: string]: string } = {};

  ngOnInit() {
    this.offerForm = this.fb.group({
      course: [null, Validators.required],
      description: ['']
    });

    this.ts.getAllCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: () => console.log("Fehler beim Laden der Kurse")
    });
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.offerForm.get('course')?.setValue(course.id);
  }

  submitForm() {
    if(this.offerForm.valid) {
      const offer: CreateOfferDto = { // Data Transfer Object um type errors beim API-request zu vermeiden
        course_id: this.offerForm.value.course,
        user_id: this.authService.getCurrentUserId(),
        description: this.offerForm.value.description
      };

      this.ts.createOffer(offer).subscribe({
        next: () => {this.toastr.success('Angebot wurde erstellt.', 'TutOrganizer');},
        error: () => {this.toastr.error('Angebot konnte nicht erstellt werden.', 'TutOrganizer');
        }
      });
      this.router.navigate(['/offers']);
    } else {
      this.errors = {};
      if (this.offerForm.get('course')?.hasError('required')) {
        this.errors['course'] = 'Kurs muss ausgewählt werden.';
      }
    }
  }

  cancel() {
    this.offerForm.reset();
    this.selectedCourse = undefined;
    this.errors = {};
    this.router.navigate(['/offers']);
  }

}
