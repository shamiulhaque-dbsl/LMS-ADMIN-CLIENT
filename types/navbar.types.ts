export interface Course {
  id: string;
  name: string;
  students: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  status: number;
  courses: Course[];
}

export interface Suggestion {
  id: number;
  title: string;
  icon: string;
  thumbnail: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
}
