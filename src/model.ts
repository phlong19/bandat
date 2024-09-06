import { Json } from "./database";

export interface ListProps {
  data?:
    | {
        brand: string | null;
        created_at: string;
        description: string | null;
        id: number;
        manufacturer: string | null;
        name: string;
        price: number;
        slug: string;
        specification: string | null;
        summary: string | null;
        images: {
          created_at: string;
          id: number;
          mediaLink: string;
          productID: number;
          isImage: boolean;
        }[];
        status: {
          id: number;
          type: string;
        };
        rootCategory: number | Category;
        parentCategory?: number | Category;
        category?: number | Category;
      }
    | undefined;
}

export interface Category {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  parent: number | null;
}

export interface Product {
  id: number;
  quantity?: number;
}

export interface OrderData {
  id: number;
  name: string;
  phone: string;
  status: {
    id: number;
    created_at: string;
    type: string;
  };
  total: number;
  details: Json;
  created_at: string;

  city: {
    cityName: string;
  };
  dis: {
    disName: string;
  };
  ward: {
    wardName: string;
  };
  address: string;

  email: string | null;
  note: string | null;
}
