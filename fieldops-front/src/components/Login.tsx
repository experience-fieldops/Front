import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types';

const Login = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      authService.setSession(response.token, response.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-6">
            <div className="text-white text-3xl font-bold">FO</div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-3">
            FieldOps
          </h1>
          <p className="text-neutral-600 text-lg">
            Painel de Gestão de Inspeções
          </p>
        </div>

        {/* Login Card */}
        <div className="card-glass p-8 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Acessar Sistema
            </h2>
            <p className="text-neutral-600">
              Entre com suas credenciais para gerenciar inspeções
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-error-500 bg-opacity-10 border border-error-500 border-opacity-20 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-error-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="form-label">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="form-input pl-10"
                    placeholder="seu.email@empresa.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="form-input pl-10"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-neutral-700">Manter conectado</span>
              </label>
              <button
                type="button"
                onClick={() => setError('Entre em contato com o administrador do sistema.')}
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
                disabled={loading}
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-4 text-lg font-medium"
            >
              {loading ? (
                <>
                  <div className="loading mr-2"></div>
                  Autenticando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Acesso disponível para:
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <span className="badge badge-primary">Supervisor</span>
                <span className="badge badge-info">Administrador</span>
                <span className="badge badge-success">Revisor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Information */}
        <div className="mt-8 p-5 bg-primary-50 border border-primary-200 rounded-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-primary-900 mb-1">
                Modo Demonstração Ativo
              </p>
              <p className="text-xs text-primary-700">
                Use qualquer e-mail e senha para testar o sistema
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} FieldOps • Sistema de Gestão de Inspeções
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            v1.0.0 • Ambiente de Desenvolvimento
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;