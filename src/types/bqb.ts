export class Position {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class BqbContent {
    type: 'TEXT' | 'IMAGE' = "TEXT";
    text: string = '';
    url: string = '';
    position: Position = new Position(0, 0)


    constructor() {
    }

    public static build(position,type:'TEXT' | 'IMAGE'="TEXT",text:string=""):BqbContent {
        const content =  new BqbContent();
        content.position = position
        content.type = type
        content.text = text
        return content
    }
}

export class Bqb {
    background: string;
    name: string;
    bqbContents: Array<BqbContent>;


    constructor(background: string, name: string, bqbContent: Array<BqbContent>) {
        this.background = background;
        this.name = name;
        this.bqbContents = bqbContent;
    }
}