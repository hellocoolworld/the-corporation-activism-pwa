import { SocialAuthProvider } from 'src/app/helpers/constants';
export interface ISetting {
  seenAnimation: boolean;
  deviceToken: string;
  socialProviders: [];
}
export class Setting {
  public seenAnimation = false;
  public deviceToken: string = null;
  public socialProviders: [
    {provider: SocialAuthProvider.facebook, link: 'https://facebook.com'},
    {provider: SocialAuthProvider.instagram, link: 'https://instagram.com'},
    {provider: SocialAuthProvider.twitter, link: 'https://twitter.com'}
  ];
  constructor(data: ISetting) {
    Object.assign(this, data);
  }
}
