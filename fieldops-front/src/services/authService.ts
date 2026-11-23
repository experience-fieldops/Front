import type { LoginCredentials, AuthUser } from '../types';

interface LoginResponse {
  token: string;
  user: AuthUser;
}

// Dados mockados para demonstração
const MOCK_USERS: AuthUser[] = [
  {
    id: 1,
    name: 'Supervisor Demo',
    email: 'supervisor@fieldops.com',
    role: 'MANAGER'
  },
  {
    id: 2,
    name: 'Administrador',
    email: 'admin@fieldops.com',
    role: 'ADMIN'
  },
  {
    id: 3,
    name: 'Revisor',
    email: 'revisor@fieldops.com',
    role: 'REVIEWER'
  }
];

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulação de chamada API com delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Para demo, aceita qualquer e-mail com qualquer senha
    const mockUser = MOCK_USERS.find(u => u.role === 'MANAGER') || MOCK_USERS[0];
    
    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlN1cGVydmlzb3IgRGVtbyIsImVtYWlsIjoic3VwZXJ2aXNvckBmaWVsZG9wcy5jb20iLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      user: {
        ...mockUser,
        email: credentials.email || mockUser.email,
        name: credentials.email ? `Usuário (${credentials.email})` : mockUser.name
      }
    };
  },

  logout() {
    localStorage.removeItem('fieldops_token');
    localStorage.removeItem('fieldops_user');
  },

  getStoredUser(): AuthUser | null {
    const raw = localStorage.getItem('fieldops_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  setSession(token: string, user: AuthUser) {
    localStorage.setItem('fieldops_token', token);
    localStorage.setItem('fieldops_user', JSON.stringify(user));
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('fieldops_token');
  },
};