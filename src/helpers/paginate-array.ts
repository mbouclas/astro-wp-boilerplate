export interface IArrayPaginator<T> {
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: T[];
}
export function arrayPaginator<T>(collection: T[], page = 1, numItems = 10): IArrayPaginator<T>  {
    if( !Array.isArray(collection) ) {
      throw `Expect array and got ${typeof collection}`;
    }
    const currentPage = page;
    const perPage = numItems;
    const offset = (page - 1) * perPage;
    const paginatedItems = collection.slice(offset, offset + perPage);

    return {
      currentPage,
      perPage,
      total: collection.length,
      totalPages: Math.ceil(collection.length / perPage),
      data: paginatedItems
    };
  }
