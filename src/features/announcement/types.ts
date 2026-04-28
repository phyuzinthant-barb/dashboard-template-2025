export interface AnnouncementFormValues {
  title: string;
  body: string;
  status: "PUBLISHED" | "UNPUBLISHED" | "SCHEDULED";
  image: File;
  scheduleAt?: string;
}

export interface AnnouncementDetail {
  title: string;
  body: string;
  image: string;
}
