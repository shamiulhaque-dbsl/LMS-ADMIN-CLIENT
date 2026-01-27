// types/profile.ts

export interface UserInfo {
  id?: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  avatarUrl?: string;
  avatar: string;
  image?: string;
  address?: string;
  bio?: string;
  status?: number;
  password?: string;
  about?: string;
  socialLinks?: any;
  professionalExperience?: string;
  expertise?: string;
  professionalExperienceDetails?: string;
}

export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  about: string;
  bio: string;
  avatar_url?: string;
  professional_experience: string;
  professional_experience_details: string;
  social_links?: any;
}

export interface EditProfileButtonProps {
  user: UserInfo;
}

export interface Order {
  id: string;
  amount: number;
  course: string;
  date: string;
  status: string;
  canDownloadInvoice: boolean;
  createdAt: string;
}

export interface Certificate {
  title: string;
  course: string;
  date: string;
  url?: string;
}
