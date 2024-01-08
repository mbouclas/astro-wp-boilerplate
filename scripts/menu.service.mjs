import {BaseService} from "./base.service.mjs";

export class MenuService extends BaseService {
    async getMenus() {
        const res = await fetch(`${this.mcmsUrl}menus`);

        return  await res.json();

    }
}
