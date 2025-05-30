export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public education: string,
    public skills: string,
    public role: string
  )
  {}
}
