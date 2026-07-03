import { doc, setDoc } from "firebase/firestore";
import { firestore } from "~/lib/firebase";

export type UpdateProfileData = {
  role: string;
  country: { name: string; code: string };
  experiencedSince: Date;
  email: string;
  fullName: string;
};

export class ProfileService {
  async update(userId: string, data: UpdateProfileData) {
    const { role, country, experiencedSince, email, fullName } = data;
    const q = doc(firestore, "Profiles", userId);
    await setDoc(q, {
      userId,
      role,
      experiencedSince,
      country,
      skills: [],
      email,
      fullName,
    });
  }
}

export const profileService = new ProfileService();
