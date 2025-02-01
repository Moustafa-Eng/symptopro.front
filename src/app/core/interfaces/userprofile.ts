export interface UserHistory {
  action: string;
  actionDate: Date;
  predictionResult: string;
  analysisResult: string | null;
}

export interface Userprofile {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  imagePath: string;
  phoneNumber: string;
  userName: string;
  userHistory: UserHistory[];
}
