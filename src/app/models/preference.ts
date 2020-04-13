export interface IPreference {
  hideWalkthrough: boolean;
  deviceToken: string;
}

export class Preference {
  public idhideWalkthrough: boolean;
  public deviceToken: string;
  constructor(data: IPreference) {
    Object.assign(this, data);
  }
}
