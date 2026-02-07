// src/types.ts

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface Issue {

  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved'; // Fixed options 
  priority: 'Low' | 'Medium' | 'High';
  
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface IssueState {
  list: Issue[];
  items: Issue[];
  loading: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IssueState = {
  list: [],
  items: [],
  loading: false,
  isLoading: false,
  error: null,
};
