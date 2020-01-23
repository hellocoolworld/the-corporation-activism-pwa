export interface IUser {
    uid: string;
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
    testimonial: string;
    tales: Array<{taleId: string, image: string, title: string, link: string}>;
    pledges: Array<{pledgeId: string, taleId: string,  image: string, title: string, link: string}>;
    actions: Array<{taleId: string, pledged: boolean, avocados: number}>;
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
    usid: string;
    email: string;
    password: string;
    displayName?: string;
    photoURL?: string;
    testimonial: string;
    tales: Array<{taleId: string, image: string, title: string, link: string}>;
    pledges: Array<{pledgeId: string, taleId: string,  image: string, title: string, link: string}>;
    actions: Array<{taleId: string, pledged: boolean, avocados: number}>;
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
