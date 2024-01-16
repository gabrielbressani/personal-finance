export class Category {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly descriptionTranslated: string,
    public readonly parentDescription: string,
  ) {}
}
