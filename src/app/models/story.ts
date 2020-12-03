export enum StoryType {
    video,
    image,
    text
}




export class Story {
    id: string;
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
