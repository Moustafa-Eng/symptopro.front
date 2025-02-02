import { Gender } from "../Enums/gender";

export interface UserData {
  id: string;
  fullName: string;
  role: string;
  dateOfBirth: string;
  userName: string;
  phoneNumber: string;
  gender: string;
  token: string;
  imagePath: string;
  email: string;
}
