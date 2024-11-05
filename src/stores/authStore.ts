import create from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
}

interface AuthState {
  users: User[];
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | null;
  userData: {
    id: string;
    username: string;
    lastLogin: string;
    isActive: boolean;
  } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, password: string) => Promise<void>;
  getActiveUsers: () => User[];
  getAllUsers: () => User[];
  updateUserStatus: (userId: string, isActive: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: 'admin',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          lastLogin: new Date().toISOString(),
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      isAuthenticated: false,
      userRole: null,
      userData: null,
      login: async (username, password) => {
        const user = get().users.find(
          (u) => u.username === username && u.password === password
        );
        
        if (user) {
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString(),
            isActive: true
          };
          
          set((state) => ({
            users: state.users.map((u) => 
              u.id === user.id ? updatedUser : u
            ),
            isAuthenticated: true,
            userRole: user.role,
            userData: {
              id: user.id,
              username: user.username,
              lastLogin: updatedUser.lastLogin,
              isActive: true
            }
          }));
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        const { userData, users } = get();
        if (userData) {
          set((state) => ({
            users: state.users.map((u) =>
              u.id === userData.id ? { ...u, isActive: false } : u
            ),
            isAuthenticated: false,
            userRole: null,
            userData: null
          }));
        }
      },
      signup: async (username, password) => {
        const userExists = get().users.some((u) => u.username === username);
        if (userExists) {
          throw new Error('Username already exists');
        }

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          password,
          role: 'user',
          lastLogin: new Date().toISOString(),
          isActive: false,
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          users: [...state.users, newUser]
        }));
      },
      getActiveUsers: () => {
        return get().users.filter((user) => user.isActive);
      },
      getAllUsers: () => {
        return get().users;
      },
      updateUserStatus: (userId, isActive) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, isActive } : u
          )
        }));
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);