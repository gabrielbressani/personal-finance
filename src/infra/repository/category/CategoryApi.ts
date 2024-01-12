import { PluggyApi } from '../PluggyApi';
import { Category } from '../../../domain/category/Category';

export class CategoryApi {
  constructor(private readonly pluggyApi = new PluggyApi()) {}

  list(): Category[] {
    const response = this.pluggyApi.doRequest('get', `/categories`);

    return response.results.map(
      (c: never) =>
        new Category(c['description'], c['descriptionTranslated'], c['parentDescription']),
    );
  }
}
