export interface IUser {
    uid: string;
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
    testimonial: string;
    stories: Array<{storyId: string, image: string, title: string, link: string}>;
    pledges: Array<{pledgeId: string, storyId: string,  image: string, title: string, link: string}>;
    actions: Array<{storyId: string, pledged: boolean, avocados: number}>;
    joinMailingList: boolean;
    allowPushNotification: boolean;
    allowEmailNotification: boolean;
    token: string;
    isVerified?: boolean;
    verificationType: string;
    verificationCode: string;
    createdAt: string;
    updatedAt: string;
    hasSeenNewCorpThisSession: boolean;
    fcmTokens?: { [token: string]: true };
}

export class User {
    uid: string;
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
    testimonial: string;
    stories: Array<{storyId: string, image: string, title: string, link: string}>;
    pledges: Array<{pledgeId: string, storyId: string,  image: string, title: string, link: string}>;
    actions: Array<{storyId: string, pledged: boolean, avocados: number}>;
    joinMailingList: boolean;
    allowPushNotification: boolean;
    allowEmailNotification: boolean;
    token: string;
    isVerified?: boolean;
    verificationType: string;
    verificationCode: string;
    createdAt: string;
    updatedAt: string;
    hasSeenNewCorpThisSession: boolean;
    public fcmTokens?: { [token: string]: true };
    constructor(data: IUser) {
      Object.assign(this, data);
    }
}
