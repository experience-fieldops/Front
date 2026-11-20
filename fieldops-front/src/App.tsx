import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Technicians from './components/Technicians';
import Scheduling from './components/Scheduling';
import Review from './components/Review';
import { authService } from './services/authService';
import type { AuthUser, UserRole } from './types';
import './App.css';

// Componente de layout moderno
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    setUser(authService.getStoredUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const isActive = (path: string) => location.pathname === path;

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      ADMIN: 'Administrador',
      MANAGER: 'Supervisor',
      REVIEWER: 'Revisor',
      TECHNICIAN: 'Técnico'
    };
    return labels[role] || 'Usuário';
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '🏠', roles: ['ADMIN', 'MANAGER', 'REVIEWER', 'TECHNICIAN'] as UserRole[] },
    { path: '/tasks', label: 'Tarefas', icon: '📋', roles: ['ADMIN', 'MANAGER'] as UserRole[] },
    { path: '/technicians', label: 'Técnicos', icon: '👨‍🔧', roles: ['ADMIN', 'MANAGER'] as UserRole[] },
    { path: '/scheduling', label: 'Agendamento', icon: '📅', roles: ['ADMIN', 'MANAGER'] as UserRole[] },
    { path: '/review', label: 'Revisão', icon: '✓', roles: ['ADMIN', 'MANAGER', 'REVIEWER'] as UserRole[] },
  ];

  return (
    <div className="app-container flex flex-col min-h-screen bg-neutral-50">
      {/* Top Navigation Bar */}
      <header className="topbar">
        <div className="topbar-content">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition"
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="font-bold text-white text-sm">FO</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">FieldOps</h1>
                <p className="text-xs text-neutral-600">
                  {user?.role === 'MANAGER' ? 'Painel do Supervisor' : 
                   user?.role === 'ADMIN' ? 'Administração' : 
                   user?.role === 'REVIEWER' ? 'Revisão' : 'Painel Técnico'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-neutral-900">{user?.name || 'Usuário'}</span>
                <span className="text-xs text-neutral-600">{getRoleLabel(user?.role || 'TECHNICIAN')}</span>
              </div>
              <div className="avatar">
                {user?.name.split(' ').map(n => n[0]).join('') || 'US'}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Sair"
              >
                <span className="text-xl">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Desktop */}
        <aside className={`hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 ${sidebarOpen ? 'lg:flex' : 'lg:hidden'}`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="font-bold text-white text-lg">FO</span>
              </div>
              <div>
                <h2 className="font-bold text-neutral-900">FieldOps</h2>
                <p className="text-xs text-neutral-600">Gestão de Inspeções</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {navigationItems
                .filter(item => !user || item.roles.includes(user.role))
                .map((item) => {
                  const active = isActive(item.path);
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active ? 'bg-primary-50 text-primary-600 font-medium' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
            </nav>
          </div>
          
          <div className="mt-auto p-6 border-t border-neutral-200">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Dicas:</span> Revise as inspeções pendentes diariamente
              </p>
            </div>
          </div>
        </aside>

        {/* Sidebar Mobile Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar Mobile */}
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                  <span className="font-bold text-white text-lg">FO</span>
                </div>
                <div>
                  <h2 className="font-bold text-neutral-900">FieldOps</h2>
                  <p className="text-xs text-neutral-600">Gestão de Inspeções</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                <span className="text-xl">‹</span>
              </button>
            </div>
            
            <nav className="space-y-2 flex-1">
              {navigationItems
                .filter(item => !user || item.roles.includes(user.role))
                .map((item) => {
                  const active = isActive(item.path);
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active ? 'bg-primary-50 text-primary-600 font-medium' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
            </nav>
            
            <div className="mt-auto">
              <div className="p-4 bg-neutral-50 rounded-lg mb-6">
                <p className="text-sm text-neutral-700">
                  <span className="font-medium">Dicas:</span> Revise as inspeções pendentes diariamente
                </p>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-neutral-100 rounded-lg">
                <div className="avatar">
                  {user?.name.split(' ').map(n => n[0]).join('') || 'US'}
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900">{user?.name || 'Usuário'}</div>
                  <div className="text-xs text-neutral-600">{getRoleLabel(user?.role || 'TECHNICIAN')}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-30">
        <div className="flex justify-around py-2">
          {navigationItems
            .filter(item => !user || item.roles.includes(user.role))
            .slice(0, 5)
            .map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex flex-col items-center p-2 ${active ? 'text-primary-600' : 'text-neutral-600'}`}
                >
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </a>
              );
            })}
        </div>
      </nav>
    </div>
  );
};

// Componente de proteção de rotas
const PrivateRoute = ({ 
  children, 
  allowedRoles = ['ADMIN', 'MANAGER', 'REVIEWER'] 
}: { 
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getStoredUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/tasks" element={
          <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
            <Layout>
              <TaskManager />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/technicians" element={
          <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
            <Layout>
              <Technicians />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/scheduling" element={
          <PrivateRoute allowedRoles={['ADMIN', 'MANAGER']}>
            <Layout>
              <Scheduling />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/review" element={
          <PrivateRoute allowedRoles={['ADMIN', 'MANAGER', 'REVIEWER']}>
            <Layout>
              <Review />
            </Layout>
          </PrivateRoute>
        } />

        {/* Redirecionamento para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;