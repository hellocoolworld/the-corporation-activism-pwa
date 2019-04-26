export enum StoryType
    {
        video,
        image,
        text
    }
export class Story {
    id: string;
    type: StoryType;
    vimeoCode: string;
    aspectRatio: string;
    image: string;
    title: string;
    slug: string;
    summary: string;
    authorName: string;
    authorImg: string;
    authorBioSummary: string;
    authorBioFull: string;
    authorId: string;
    views: number;
    avocados: number;
    comments: number;
    pledgeCount: number;
    takeActionSummary: string;
    takeActionBody: string;
    body: string;
    tags: Array<{name: string, link: string}>;
    images: Array<{url: string}>;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}