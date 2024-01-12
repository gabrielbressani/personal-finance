export class Account {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly subtype: string,
    public readonly name: string,
    public readonly balance: number,
    public readonly currencyCode: string,
  ) {}
}
