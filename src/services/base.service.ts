import {readFile} from "fs/promises";
import type {IAcfField} from "@models/general.ts";

export class BaseService {
    public async load(filename: string) {
        const cached = await readFile(`__cache/${filename}.json`)
        return JSON.parse(cached.toString());
    }

    public async getSiteSettings(key = 'Site Settings'): Promise<IAcfField[]> {
        const allAcfGroups = await this.load('all_options_pages');
        const siteSettingsGroup = allAcfGroups.find((group: any) => group.title === key);
        if (!siteSettingsGroup) {
            return [];
        }

        return siteSettingsGroup.fields;
    }

    public getAcfField(key: string, acfFields: IAcfField[]): IAcfField {
        const acfField = acfFields.find((acfField: IAcfField) => acfField._name === key);
        if (!acfField) {
            throw new Error(`Acf field ${key} not found`);
        }

        return acfField;
    }
}
