import { SocialAuthProvider } from '../helpers/constants';

export interface ISetting {
  seenAnimation: boolean;
  deviceToken: string;
  socialProviders: [];
}

export class Setting {
  public seenAnimation = false;
  public deviceToken = '';
  public socialProviders: [
    {provider: SocialAuthProvider.facebook, link: 'https://facebook.com'},
    {provider: SocialAuthProvider.instagram, link: 'https://instagram.com'},
    {provider: SocialAuthProvider.twitter, link: 'https://twitter.com'}
  ];
  constructor(data: ISetting) {
    // console.log('data: ', data);
    if (data) {
      Object.assign(this, data);
    }
  }
}
