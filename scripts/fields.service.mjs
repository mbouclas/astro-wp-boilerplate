import {BaseService} from "./base.service.mjs";

export class FieldsService extends BaseService {
    async getGroups() {
        const res = await fetch(`${this.mcmsUrl}fields`);

        return  await res.json();

    }
}
