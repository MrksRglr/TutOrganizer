import {Course} from './course';
import {User} from './user';

export class Offer {
  constructor(
    public id: number,
    public course: Course,
    public user: User,
    public description?: string
  )
  {}
}
