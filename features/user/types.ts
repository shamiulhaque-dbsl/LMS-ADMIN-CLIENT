export interface UserInfo {
  id?: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  userName?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  avatar_url?: string;
  avatar?: string;
  image?: string;
  address?: string;
  bio?: string;
  status?: number;
  password?: string;
  about?: string;
  role?: string;
  socialLinks?: any;
  social_links?: any;
  professionalExperience?: string;
  professional_experience?: string;
  professional_experience_details?: string;
  expertise?: string;
  professionalExperienceDetails?: string;
}

export interface UserResponse {
  id?: number;
  status?: string;
}
