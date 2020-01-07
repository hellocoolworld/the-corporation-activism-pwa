export enum TaleType {
  video,
  image,
  text
}
export class Tale {
    id: string;
    type: TaleType;
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
    avocados: number;
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
