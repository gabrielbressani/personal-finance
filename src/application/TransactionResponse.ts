export class TransactionResponse {
  constructor(
    private readonly id: string,
    private readonly date: Date,
    private readonly description: string,
    private readonly category: string,
    private readonly type: string,
    private readonly amount: number,
  ) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.category = category;
    this.type = type;
    this.amount = amount;
  }
}
