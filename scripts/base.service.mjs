export class BaseService {
    apiUrl = process.env.API_BASE_URL;
    wpUrl = this.apiUrl + process.env.WP_ENDPOINT;
    mcmsUrl = this.apiUrl + process.env.MCMS_ENDPOINT;
    totalPagesHeaderParam = 'X-WP-TotalPages';
    totalItemsHeaderParam = 'X-WP-Total';
    astroKey = process.env.ASTRO_KEY;

    async getImage(id) {
        const res = await fetch(`${this.wpUrl}media/${id}`);

        return await res.json();
    }

    async getTaxonomies(type) {
        const url = `${this.wpUrl}taxonomies?${type ? `type=${type}` : ''}`;
        const res = await fetch(url);
        const taxonomies = await res.json();

        // foreach taxonomy, go fetch the terms
        for (const key in taxonomies) {
            taxonomies[key].terms = await this.getTerms(taxonomies[key].rest_base);
        }

        return taxonomies;
    }


    async getTerms(taxonomy) {
        const url = `${this.wpUrl}${taxonomy}`;
        const res = await fetch(url);
        const terms = await res.json();

        return terms;
    }
}
