export enum StoryType {
    video,
    image,
    text
}
export class Story {
    id: string;
    videoId: string;
    type: StoryType;
    title: string;
    slug: string;
    blurb: string;
    summary: string;
    views: number;
    avocadoCount: number;
    avocadoRating: number;
    pledgeCount: number;
    actionSummary: string;
    actions: [];
    share: any;
    createdAt: string;
    updatedAt: string;
}
