export interface iSetting
 {
  seenAnimation: boolean;
  deviceToken: string;
}

export class Setting {
  public seenAnimation: boolean = false;
  public deviceToken: string = null;
  constructor(data: iSetting) {
    Object.assign(this, data);
  }
}
