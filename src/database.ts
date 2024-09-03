export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          parent: number | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          parent?: number | null;
          slug?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          parent?: number | null;
          slug?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "category_parent_fkey";
            columns: ["parent"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
        ];
      };
      CityDirectory: {
        Row: {
          cityID: number;
          cityName: string | null;
          created_at: string;
        };
        Insert: {
          cityID?: number;
          cityName?: string | null;
          created_at?: string;
        };
        Update: {
          cityID?: number;
          cityName?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      DistrictDirectory: {
        Row: {
          cityID: number | null;
          created_at: string;
          disID: number;
          disName: string | null;
        };
        Insert: {
          cityID?: number | null;
          created_at?: string;
          disID?: number;
          disName?: string | null;
        };
        Update: {
          cityID?: number | null;
          created_at?: string;
          disID?: number;
          disName?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "DistrictDirectory_cityID_fkey";
            columns: ["cityID"];
            isOneToOne: false;
            referencedRelation: "CityDirectory";
            referencedColumns: ["cityID"];
          },
        ];
      };
      News: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          slug: string | null;
          status: boolean | null;
          summary: string | null;
          thumbnail: string | null;
          title: string | null;
          userID: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          slug?: string | null;
          status?: boolean | null;
          summary?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          userID?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          slug?: string | null;
          status?: boolean | null;
          summary?: string | null;
          thumbnail?: string | null;
          title?: string | null;
          userID?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "News_userID_fkey";
            columns: ["userID"];
            isOneToOne: false;
            referencedRelation: "Profile";
            referencedColumns: ["id"];
          },
        ];
      };
      order: {
        Row: {
          address: string | null;
          cityID: number | null;
          created_at: string;
          details: Json | null;
          disID: number | null;
          email: string | null;
          id: number;
          name: string | null;
          note: string | null;
          phone: number | null;
          total: number | null;
          wardID: number | null;
          status: number;
        };
        Insert: {
          address?: string | null;
          cityID?: number | null;
          created_at?: string;
          details?: Json | null;
          disID?: number | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          note?: string | null;
          phone?: string | null;
          total?: number | null;
          wardID?: number | null;
          status: number;
        };
        Update: {
          address?: string | null;
          cityID?: number | null;
          created_at?: string;
          details?: Json | null;
          disID?: number | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          note?: string | null;
          phone?: number | null;
          total?: number | null;
          wardID?: number | null;
          status: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_cityID_fkey";
            columns: ["cityID"];
            isOneToOne: false;
            referencedRelation: "CityDirectory";
            referencedColumns: ["cityID"];
          },
          {
            foreignKeyName: "order_disID_fkey";
            columns: ["disID"];
            isOneToOne: false;
            referencedRelation: "DistrictDirectory";
            referencedColumns: ["disID"];
          },
          {
            foreignKeyName: "order_wardID_fkey";
            columns: ["wardID"];
            isOneToOne: false;
            referencedRelation: "WardDirectory";
            referencedColumns: ["wardID"];
          },
        ];
      };
      product: {
        Row: {
          brand: string | null;
          category: number | null;
          created_at: string;
          description: string | null;
          id: number;
          manufacturer: string | null;
          name: string;
          parentCategory: number | null;
          price: number;
          rootCategory: number | null;
          slug: string | null;
          specification: string | null;
          status: number | null;
          summary: string | null;
        };
        Insert: {
          brand?: string | null;
          category?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          manufacturer?: string | null;
          name?: string | null;
          parentCategory?: number | null;
          price?: number | null;
          rootCategory?: number | null;
          slug?: string | null;
          specification?: string | null;
          status?: number | null;
          summary?: string | null;
        };
        Update: {
          brand?: string | null;
          category?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          manufacturer?: string | null;
          name?: string | null;
          parentCategory?: number | null;
          price?: number | null;
          rootCategory?: number | null;
          slug?: string | null;
          specification?: string | null;
          status?: number | null;
          summary?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_category_fkey";
            columns: ["category"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_parentCategory_fkey";
            columns: ["parentCategory"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_rootCategory_fkey";
            columns: ["rootCategory"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_status_fkey";
            columns: ["status"];
            isOneToOne: false;
            referencedRelation: "status";
            referencedColumns: ["id"];
          },
        ];
      };
      product_image: {
        Row: {
          created_at: string;
          id: number;
          isImage: boolean;
          mediaLink: string;
          productID: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isImage?: boolean | null;
          mediaLink?: string;
          productID?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          isImage?: boolean | null;
          mediaLink?: string;
          productID?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_image_productID_fkey";
            columns: ["productID"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
        ];
      };
      Profile: {
        Row: {
          address: string | null;
          allowEditDate: string | null;
          avatar: string | null;
          bio: string | null;
          birthday: string | null;
          created_at: string;
          email: string | null;
          fullName: string | null;
          id: string;
          level: number | null;
          phone: number | null;
          sex: boolean | null;
        };
        Insert: {
          address?: string | null;
          allowEditDate?: string | null;
          avatar?: string | null;
          bio?: string | null;
          birthday?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id: string;
          level?: number | null;
          phone?: number | null;
          sex?: boolean | null;
        };
        Update: {
          address?: string | null;
          allowEditDate?: string | null;
          avatar?: string | null;
          bio?: string | null;
          birthday?: string | null;
          created_at?: string;
          email?: string | null;
          fullName?: string | null;
          id?: string;
          level?: number | null;
          phone?: number | null;
          sex?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "Profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      status: {
        Row: {
          created_at: string;
          id: number;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          type?: string | null;
        };
        Relationships: [];
      };
      WardDirectory: {
        Row: {
          created_at: string;
          disID: number | null;
          wardID: number;
          wardName: string | null;
        };
        Insert: {
          created_at?: string;
          disID?: number | null;
          wardID?: number;
          wardName?: string | null;
        };
        Update: {
          created_at?: string;
          disID?: number | null;
          wardID?: number;
          wardName?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "WardDirectory_disID_fkey";
            columns: ["disID"];
            isOneToOne: false;
            referencedRelation: "DistrictDirectory";
            referencedColumns: ["disID"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
