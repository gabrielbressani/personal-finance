export class CreditCardMetadata {
  constructor(
    public readonly installmentNumber: number,
    public readonly totalInstallments: number,
    public readonly totalAmount: number,
  ) {}
}

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly descriptionRaw: string | null,
    public readonly currencyCode: string,
    public readonly amount: number,
    public readonly amountInAccountCurrency: number | null,
    public readonly date: Date,
    public readonly category: string,
    public readonly categoryId: string,
    public readonly balance: number | null,
    public readonly accountId: string,
    public readonly providerCode: string | null,
    public readonly status: string,
    // public readonly paymentData: any, // You may replace 'any' with the actual typ,
    public readonly type: string,
    public readonly creditCardMetadata: CreditCardMetadata | null, // You may replace 'any' with the actual typ,
    // public readonly acquirerData: any, // You may replace 'any' with the actual typ,
    // public readonly merchant: any, // You may replace 'any' with the actual typ,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
