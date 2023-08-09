export interface Event {
    id?: string // supabase
    created_at?: string; 
    updated_at?: string;
    user_id?: string;
    date?: string | null;
    duration?: number;
    locations?: [number?];
    symptoms?: [number?];
    medications: [number?];
    pain?: number;

}