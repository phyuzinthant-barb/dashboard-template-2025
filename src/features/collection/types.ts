export interface CollectionFormValues {
  name: string;
  items: {
    reference: string;
    referenceModel: "Movie" | "Series";
  }[];
}

export interface CollectionItem {
  name: string;
  items: {
    reference: any;
    referenceModel: "Movie" | "Series";
  }[];
  id: string;
}
