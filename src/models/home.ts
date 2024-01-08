import type { IGenericWpObject} from "@models/general.ts";

export interface IHomePageSliderItem {
    car: number;
    caption: string;
}

export interface IHomePage extends IGenericWpObject {
    acf: {
        slider: IHomePageSliderItem[];
        welcome_text: string;
        latest_cars: number;
    }
}
