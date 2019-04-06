export class UserAccountModel {
  email: string;
  name: string;
  password: string;
  displayName: string;
  imageUrl: string;
  testimonial: string;
  stories: Array<{image: string, title: string, link: string}> = [
    {
      image: '',
      title: '',
      link: ''
    },
    {
      image: '',
      title: '',
      link: ''
    },
  ];
  pledges: Array<{image: string, title: string, link: string}> = [
    {
      image: '',
      title: '',
      link: ''
    }
  ];

  constructor(readonly isShell: boolean) { }
}
