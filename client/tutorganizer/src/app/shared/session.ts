import {Timeslot} from './timeslot';
import {Offer} from './offer';
import {Inquiry} from './inquiry';
import {User} from './user';

export class Session {
  constructor(
    public id: number,
    public offer: Offer,
    public inquiry: Inquiry,
    public proposed_by: User,
    public status: string,
    public timeslots: Timeslot[],
    public successfully_completed: boolean,
    public accepted_by?: User,
    public comment?: string
  )
  {}
}
