import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getStoredUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navigation = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/tasks', label: 'Tarefas', icon: '📋' },
    { path: '/scheduling', label: 'Agendar', icon: '📅' },
    { path: '/technicians', label: 'Técnicos', icon: '👨‍🔧' },
    { path: '/review', label: 'Revisar', icon: '✓' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getUserRoleText = () => {
    switch (user?.role) {
      case 'MANAGER': return 'Supervisor';
      case 'ADMIN': return 'Administrador';
      case 'REVIEWER': return 'Revisor';
      case 'INSPECTOR': return 'Técnico';
      default: return 'Usuário';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">FO</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">FieldOps</h1>
              <p className="text-xs text-neutral-500">Painel de Gestão</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                {user?.name.split(' ').map(n => n[0]).join('') || 'US'}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                <p className="text-xs text-neutral-500">{getUserRoleText()}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Topbar - Mobile/Desktop */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FO</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">FieldOps</h1>
              <p className="text-xs text-neutral-500 hidden sm:block">
                {isActive('/') && 'Dashboard'}
                {isActive('/tasks') && 'Gerenciamento de Tarefas'}
                {isActive('/scheduling') && 'Agendamento de Inspeções'}
                {isActive('/technicians') && 'Gestão de Técnicos'}
                {isActive('/review') && 'Revisão de Inspeções'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="avatar avatar-sm">
                {user?.name.split(' ').map(n => n[0]).join('') || 'US'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                <p className="text-xs text-neutral-500">{getUserRoleText()}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`${'lg:pl-64'}`}>
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 ${
                isActive(item.path)
                  ? 'text-primary-600'
                  : 'text-neutral-500'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Padding for bottom nav on mobile */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default Layout;