export class TransactionResponse {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly description: string,
    public readonly category: string,
    public readonly type: string,
    public readonly amount: number,
  ) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.category = category;
    this.type = type;
    this.amount = amount;
  }
}
