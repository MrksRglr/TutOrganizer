import { Routes } from '@angular/router';
import {HeroComponent} from './hero/hero.component';
import {OfferListComponent} from './offer-list/offer-list.component';
import {LoginComponent} from './login/login.component';
import {OfferFormComponent} from './offer-form/offer-form.component';
import {InquiryListComponent} from './inquiry-list/inquiry-list.component';
import {SessionListComponent} from './session-list/session-list.component';
import {SessionFormComponent} from './session-form/session-form.component';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HeroComponent},
  {path:'offers', component: OfferListComponent},
  {path:'home/login', component: LoginComponent},
  {path:'offers/new_offer_form', component: OfferFormComponent},
  {path:'inquiries', component: InquiryListComponent},
  {path:'sessions', component: SessionListComponent},
  {path:'sessions/new_session_form', component: SessionFormComponent},
];
