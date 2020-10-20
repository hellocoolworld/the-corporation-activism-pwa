export enum StoryType {
    video,
    image,
    text
}

export class Story {
    id: string;
    videoId: string;
    imageId: string;
    show: boolean;
    type: StoryType;
    title: string;
    slug: string;
    blurb: string;
    summary: string;
    views: number;
    avocadoCount: number;
    avocadoRating: number;
    pledgeCount: number;
    actionTitle: string;
    actionSummary: string;
    actions: [];
    share: any;
    createdAt: string;
    updatedAt: string;
}
