export enum storyType
    {
        video,
        image,
        text
    }
export class Story {
    id: string;
    type: storyType;
    vimeoCode: string;
    image: string;
    title: string;
    slug: string;
    summary: string;
    authorName: string;
    authorId: string;
    views: number;
    likes: number;
    comments: number;
    takeActionHeader: string;
    takeActionBody: string;
    body: string;
    pledgesCount: number;
    tags: Array<{name: string, link: string}>;
    images: Array<{url: string}>;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}