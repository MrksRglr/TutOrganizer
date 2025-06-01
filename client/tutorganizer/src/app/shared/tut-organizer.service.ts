import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {Offer} from './offer';
import {Course} from './course';
import {CreateOfferDto} from './dto/create-offer.dto';
import {CreateInquiryDto} from './dto/create-inquiry.dto';

@Injectable({
  providedIn: 'root'
})
export class TutOrganizerService {
  private api = 'http://tutorganizer.s2210456031.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.api}/courses`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  getSingleOffer(id: number): Observable<Offer> {
      return this.http.get<Offer>(`${this.api}/offers/${id}`)
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

    private errorHandler(error: Error | any): Observable<any> {
      return throwError(error);
    }

}
