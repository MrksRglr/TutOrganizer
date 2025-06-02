import {Session} from './session';

export class Timeslot {
  constructor(
    public start_time: string,
    public end_time: string,
    public session_id?: number
  )
  {}
}
