export enum StoryType {
    video,
    image,
    text
}




export class Story {
    id: string;
    order:number;
    videoId: string;
    imageId: string;
    type: StoryType;
    title: string;
    slug: string;
    blurb: string;
    summary: string;
    actions: [];
    share: any;
    show: boolean;
}
