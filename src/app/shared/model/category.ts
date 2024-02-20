import { TranslatedWord } from "./TranslatedWord";
import { Language } from "./language";

export class Category {
    lastUpdatedDate = new Date();
    words: TranslatedWord[] = [];

    constructor(
        public id: number,
        public categoryName: string,
        origin: Language,
        target: Language
    ) {
    }
}
