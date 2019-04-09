export class User {
    id: string;
    email: string;
    password: string;
    displayName: string;
    imageUrl: string;
    testimonial: string;
    stories: Array<{storyId: string, image: string, title: string, link: string}>;
    pledges: Array<{pledgeId: string, storyId: string,  image: string, title: string, link: string}>;
    token: string;
    isVerified: boolean;
    verificationType: string;
    verificationCode: string;
    createdAt: string;
    updatedAt: string;
}
