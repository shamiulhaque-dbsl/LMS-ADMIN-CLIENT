export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  location: string;
  joinDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  rating: string;
  status: "Completed" | "In Progress" | "Not Started";
  progress: number;
}

export interface Order {
  id: string;
  course: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing";
}

export interface Certificate {
  id: string;
  title: string;
  course: string;
  date: string;
}
