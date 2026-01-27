export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          provider: 'kakao' | 'naver' | null;
          provider_id: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          provider?: 'kakao' | 'naver' | null;
          provider_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          phone?: string | null;
          provider?: 'kakao' | 'naver' | null;
          provider_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
      };
      diagnosis_results: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          answers: Json;
          result_type: '협의' | '조정' | '소송';
          score: number;
          result_detail: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          answers: Json;
          result_type: '협의' | '조정' | '소송';
          score: number;
          result_detail?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          answers?: Json;
          result_type?: '협의' | '조정' | '소송';
          score?: number;
          result_detail?: Json | null;
          created_at?: string;
        };
      };
      calculator_results: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          calculator_type: '양육비' | '재산분할';
          input_data: Json;
          result_data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          calculator_type: '양육비' | '재산분할';
          input_data: Json;
          result_data: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          calculator_type?: '양육비' | '재산분할';
          input_data?: Json;
          result_data?: Json;
          created_at?: string;
        };
      };
      consultations: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          phone: string;
          preferred_time: string | null;
          status: 'pending' | 'contacted' | 'completed';
          current_situation: string | null;
          interests: string | null;
          description: string | null;
          diagnosis_id: string | null;
          calculator_id: string | null;
          created_at: string;
          contacted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          phone: string;
          preferred_time?: string | null;
          status?: 'pending' | 'contacted' | 'completed';
          current_situation?: string | null;
          interests?: string | null;
          description?: string | null;
          diagnosis_id?: string | null;
          calculator_id?: string | null;
          created_at?: string;
          contacted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          phone?: string;
          preferred_time?: string | null;
          status?: 'pending' | 'contacted' | 'completed';
          current_situation?: string | null;
          interests?: string | null;
          description?: string | null;
          diagnosis_id?: string | null;
          calculator_id?: string | null;
          created_at?: string;
          contacted_at?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string;
          excerpt: string | null;
          featured_image: string | null;
          category_id: string | null;
          status: 'draft' | 'published';
          seo_meta: Json | null;
          view_count: number;
          published_at: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content: string;
          excerpt?: string | null;
          featured_image?: string | null;
          category_id?: string | null;
          status?: 'draft' | 'published';
          seo_meta?: Json | null;
          view_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          category_id?: string | null;
          status?: 'draft' | 'published';
          seo_meta?: Json | null;
          view_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
        };
      };
      saved_contents: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      admin_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          updated_at?: string;
        };
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
  };
};

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
