import { SocialAuthProvider } from 'src/app/helpers/constants';
export interface ISetting {
  seenAnimation: boolean;
  deviceToken: string;
  socialProviders: [];
}

export class Setting {
  public seenAnimation: boolean = false;
  public deviceToken: string = null;
  public socialProviderssocialProviderssocialProviders: [
    {provider: SocialAuthProvider.facebook, 'https://facebook.com'},
    {provider: SocialAuthProvider.instagram, 'https://instagram.com'},
    {provider: SocialAuthProvider.twitter, 'https://twitter.com'}
  ];
  constructor(data: ISetting) {
    Object.assign(this, data);
  }
}
