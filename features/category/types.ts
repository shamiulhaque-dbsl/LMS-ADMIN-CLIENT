export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: number;
  sort_order: number;
};

export type FormData = Partial<Category>;
