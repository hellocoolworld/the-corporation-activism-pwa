export interface IUser {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  favoriteColor?: string;
  statusMessage?: string;
  mobile: string;
  phone?: string;
  country: string;
  town?: string;
  deactivated?: boolean;
  fcmTokens?: { [token: string]: true };
  friendIds?: string[];
}

export class User {
  public uid: string;
  public email: string;
  public photoUrl?: string;
  public displayName?: string;
  public favoriteColor?: string;
  public statusMessage?: string;
  public mobile: string;
  public country: string;
  public deactivated?: boolean;
  public friendIds?: string[];
  public fcmTokens?: { [token: string]: true };
  constructor(data: IUser) {
    Object.assign(this, data);
  }
}
