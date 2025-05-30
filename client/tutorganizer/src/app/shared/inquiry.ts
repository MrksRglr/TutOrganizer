import {User} from './user';
import {Offer} from './offer';

export class Inquiry {
  constructor(
    public id: number,
    public user: User,
    public offer: Offer,
    public status: string
  )
  {}
}
