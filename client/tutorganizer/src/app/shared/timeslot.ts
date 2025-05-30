import {Session} from './session';

export class Timeslot {
  constructor(
    public id: number,
    public start_time: Date,
    public end_time: Date,
    public session: Session
  )
  {}
}
