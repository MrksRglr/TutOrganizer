import { Routes } from '@angular/router';
import {HeroComponent} from './hero/hero.component';
import {OfferListComponent} from './offer-list/offer-list.component';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HeroComponent},
  {path:'offers', component: OfferListComponent},
];
