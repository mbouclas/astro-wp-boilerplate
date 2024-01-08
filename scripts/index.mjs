import dotenv from "dotenv"
import {statSync} from "node:fs";
let envPath = '.env';
const env = process.env.ENV ? process.env.ENV : process.env.NODE_ENV || 'development';

try {
    envPath = (statSync(resolve(`.env.${env}`))) ?  `.env.${env}` : '.env';
}
catch (e) {

}

dotenv.config({ path: resolve(process.cwd(), envPath)});
import { loadEnv } from "vite"
import fs from "fs";
import { writeFile } from "fs/promises";
import {join, dirname, resolve} from "path";
import { fileURLToPath } from "url";
import {CarsService} from "./cars.service.mjs";
import {MenuService} from "./menu.service.mjs";
import {FieldsService} from "./fields.service.mjs";
import {PostsService} from "./posts.service.mjs";
import {PagesService} from "./pages.service.mjs";
import {OptionsPagesService} from "./optionsPages.service.mjs";


const __filename = fileURLToPath(import.meta.url);
const { API_BASE_URL, ASTRO_KEY } = loadEnv("production", process.cwd(), "");
const __dirname = dirname(__filename);

const cacheFolderLocation = join(__dirname, "../", "__cache");

if (process.env.USE_CACHE && process.env.USE_CACHE === "true") {
    process.exit()
}

if (!fs.existsSync(cacheFolderLocation)) {
    fs.mkdirSync(cacheFolderLocation)
}

// get the menus, all posts, pages, cars, makes, models, years

const timeStart = Date.now();
Promise.all([
    saveTaxonomies(),
    saveMenus(),
    saveAcfGroups(),
    saveAllPosts(),
    saveAllPages(),
    saveOptionsPages(),
    saveGroupedObjects(),
])
    .then(async () => {
        await new CarsService().postProcessing(cacheFolderLocation);
    })
    .then(() => {
    console.log(`* All done in ${Date.now() - timeStart}ms`);
    process.exit();
});

async function saveTaxonomies() {
    const s = new CarsService();
    const taxonomies = await s.getTaxonomies();
    for (const key in taxonomies) {
        const items = taxonomies[key].terms;

        try {
            await writeFile(
                join(cacheFolderLocation, `${taxonomies[key].slug}.json`),
                JSON.stringify(items)
            )
            console.log(`* Saving ${taxonomies[key].name} complete`)
        } catch (e) {
            console.log(e)
        }
    }

}

async function saveMenus() {
    const s = new MenuService();
    const items = await s.getMenus();
    try {
        await writeFile(
            join(cacheFolderLocation, `all_menus.json`),
            JSON.stringify(items)
        )
        console.log(`* Saving All menus complete`)
    } catch (e) {
        console.log(e)
    }
}

async function saveAcfGroups() {
    const s = new FieldsService();
    const items = await s.getGroups();

    try {
        await writeFile(
            join(cacheFolderLocation, `all_acf_groups.json`),
            JSON.stringify(items)
        )
        console.log(`* Saving All acf groups complete`)
    } catch (e) {
        console.log(e)
    }

    // get the contact form fields
    let foundIdx = null;
    items.forEach((item,idx ) => {
        if (!item['acfe_meta']) {
            return;
        }

        for (const key in item['acfe_meta']) {
            if (item['acfe_meta'][key]['acfe_meta_key'] === 'type' && item['acfe_meta'][key]['acfe_meta_value'] === 'contact') {
                foundIdx = idx;
                break;
            }
        }
    });

    if (!foundIdx) {
        return;
    }

    try {
        await writeFile(
            join(cacheFolderLocation, `contact_form_fields.json`),
            JSON.stringify(items[foundIdx].fields)
        )
        console.log(`* Saving contact form fields complete`)
    }
    catch (e) {
        console.log(e)
    }
}

async function saveAllPosts() {
    const s = new PostsService();
    const items = await s.getPosts();
    try {
        await writeFile(
            join(cacheFolderLocation, `all_posts.json`),
            JSON.stringify(items)
        )
        console.log(`* Saving All posts complete`)
    } catch (e) {
        console.log(e)
    }
}

async function saveAllPages() {
    const s = new PagesService();
    const items = await s.getPages();
    try {
        await writeFile(
            join(cacheFolderLocation, `all_pages.json`),
            JSON.stringify(items)
        )
        console.log(`* Saving All pages complete`)
    } catch (e) {
        console.log(e)
    }
}

async function saveGroupedObjects() {
    const s = new CarsService();
    const byMake = await s.groupByMake();
    const byModel = await s.groupByModel();

    for (const key in byMake) {
        try {
            await writeFile(
                join(cacheFolderLocation, `make_${key}.json`),
                JSON.stringify(byMake[key])
            )
            console.log(`* Saving All ${key} complete`)
        } catch (e) {
            console.log(e)
        }
    }

    for (const key in byModel) {
        try {
            await writeFile(
                join(cacheFolderLocation, `model_${key}.json`),
                JSON.stringify(byModel[key])
            )
            console.log(`* Saving All ${key} complete`)
        } catch (e) {
            console.log(e)
        }
    }
}

async function saveOptionsPages() {
    const s = new OptionsPagesService();
    const items = await s.getOptionsPages();
    try {
        await writeFile(
            join(cacheFolderLocation, `all_options_pages.json`),
            JSON.stringify(items)
        )
        console.log(`* Saving All options pages complete`)
    } catch (e) {
        console.log(e)
    }
}
