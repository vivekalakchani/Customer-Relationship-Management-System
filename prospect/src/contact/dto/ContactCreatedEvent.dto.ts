export class ContactCreatedEvent {
  constructor(
    public readonly prospectId: string,
    public readonly email: string,
    public readonly telNo: number,
    public readonly type: string,
  ) {}
}
