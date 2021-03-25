export interface Card {
    name:string;
    manaCost:string;
    cmc:string;
    colors:Array<string>;
    type:string;
    rarity:string;
    text:string;
    power:string;
    toughness:string;
    imageUrl:string;
}