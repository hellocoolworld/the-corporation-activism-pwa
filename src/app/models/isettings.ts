export interface ISetting {
    title: string;
    open: boolean;
    items: Array<{
      text: string;
      icon: string;
      selected?: boolean;
      description?: string;
      checkbox?: boolean;
      event?: (data: any) => void;
    }>;
  }
  