import dotenv from "dotenv"
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import critters from "astro-critters";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

import {resolve} from "path";
import {statSync} from "node:fs";
let envPath = '.env';
const env = process.env.ENV ? process.env.ENV : process.env.NODE_ENV || 'development';
try {
  envPath = (statSync(resolve(`.env.${env}`))) ?  `.env.${env}` : '.env';
}
catch (e) {

}

dotenv.config({ path: resolve(process.cwd(), envPath)});
console.log(env, process.env.SITE_BASE_URL)


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), critters(), sitemap(), svelte(), mdx(), ]
});
