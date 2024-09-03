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
