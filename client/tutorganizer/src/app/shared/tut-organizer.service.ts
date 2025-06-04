import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {Offer} from './offer';
import {Course} from './course';
import {CreateOfferDto} from './dto/create-offer.dto';
import {CreateInquiryDto} from './dto/create-inquiry.dto';
import {Inquiry} from './inquiry';
import {Session} from './session';

@Injectable({
  providedIn: 'root'
})
export class TutOrganizerService {
  private api = 'http://tutorganizer.s2210456031.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.api}/courses`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createOffer(offer: CreateOfferDto): Observable<any> {
    return this.http.post<Offer>(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeOffer(id: number): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  editOffer(id: number, offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${id}`, offer)
  }

  createInquiry(inquiry: CreateInquiryDto): Observable<any> {
    return this.http.post(`${this.api}/inquiries`, inquiry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.api}/inquiries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getInquiryById(id: number): Observable<Inquiry> {
    return this.http.get<Inquiry>(`${this.api}/inquiries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateInquiry(id: number, inquiry: CreateInquiryDto): Observable<any> {
    return this.http.put(`${this.api}/inquiries/${id}`, inquiry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeInquiry(id: number) {
    return this.http.delete(`${this.api}/inquiries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createSession(session: any): Observable<Session> {
    return this.http.post<Session>(`${this.api}/sessions`, session)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.api}/sessions`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  removeSession(id: number): Observable<any> {
    return this.http.delete(`${this.api}/sessions/${id}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  editSession(id: number, session: Session): Observable<any> {
    return this.http.put(`${this.api}/sessions/${id}`, session)
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
