import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats] = useState({
    totalTasks: 156,
    inProgress: 24,
    completed: 128,
    overdue: 4,
    activeTechnicians: 8,
    pendingReview: 12,
    approvalRate: 94.2,
    avgCompletionTime: '2h 45m'
  });

  const recentTasks = [
    { id: 1, title: 'Inspeção Elétrica - Prédio A', technician: 'João Silva', status: 'in_progress', priority: 'high', dueDate: '20/11', progress: 75 },
    { id: 2, title: 'Manutenção Preventiva - Refrigeração', technician: 'Maria Santos', status: 'pending', priority: 'medium', dueDate: '22/11', progress: 30 },
    { id: 3, title: 'Vistoria de Segurança - Área Industrial', technician: 'Pedro Costa', status: 'completed', priority: 'high', dueDate: '18/11', progress: 100 },
    { id: 4, title: 'Calibração de Instrumentos', technician: 'Ana Oliveira', status: 'overdue', priority: 'high', dueDate: '15/11', progress: 60 },
  ];

  const topTechnicians = [
    { id: 1, name: 'João Silva', completed: 45, rating: 4.8, efficiency: 95 },
    { id: 2, name: 'Maria Santos', completed: 42, rating: 4.7, efficiency: 92 },
    { id: 3, name: 'Pedro Costa', completed: 38, rating: 4.5, efficiency: 88 },
    { id: 4, name: 'Ana Oliveira', completed: 35, rating: 4.3, efficiency: 85 },
  ];

  const quickActions = [
    { icon: '📋', label: 'Nova Tarefa', description: 'Criar inspeção', action: '/tasks' },
    { icon: '📅', label: 'Agendar', description: 'Planejar inspeções', action: '/scheduling' },
    { icon: '👨‍🔧', label: 'Técnicos', description: 'Gerenciar equipe', action: '/technicians' },
    { icon: '✓', label: 'Revisar', description: 'Aprovar inspeções', action: '/review' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: any = {
      'in_progress': { label: 'Em andamento', color: 'badge-primary' },
      'pending': { label: 'Pendente', color: 'badge-warning' },
      'completed': { label: 'Concluída', color: 'badge-success' },
      'overdue': { label: 'Atrasada', color: 'badge-error' }
    };
    return statusMap[status] || { label: status, color: 'badge-info' };
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: any = {
      'high': { label: 'Alta', color: 'bg-error-500 bg-opacity-10 text-error-700' },
      'medium': { label: 'Média', color: 'bg-warning-500 bg-opacity-10 text-warning-700' },
      'low': { label: 'Baixa', color: 'bg-success-500 bg-opacity-10 text-success-700' }
    };
    return priorityMap[priority] || { label: priority, color: 'bg-neutral-100 text-neutral-700' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h2>
        <p className="text-neutral-600">
          Visão geral das operações e métricas de desempenho
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.action}
            className="card p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-primary-300 cursor-pointer"
          >
            <div className="text-3xl mb-4">{action.icon}</div>
            <div className="font-semibold text-neutral-900 mb-1">{action.label}</div>
            <div className="text-sm text-neutral-600">{action.description}</div>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total de Tarefas</p>
              <p className="stats-value">{stats.totalTasks}</p>
              <div className="stats-change positive">
                <span>↑ 12%</span>
                <span className="text-neutral-500">vs mês anterior</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <span className="text-xl text-primary-600">📊</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-600">Em Andamento</p>
              <p className="stats-value">{stats.inProgress}</p>
              <div className="text-neutral-500 text-sm mt-2">
                {stats.activeTechnicians} técnicos ativos
              </div>
            </div>
            <div className="p-3 rounded-full bg-warning-100">
              <span className="text-xl text-warning-600">⏳</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-600">Concluídas</p>
              <p className="stats-value">{stats.completed}</p>
              <div className="stats-change positive">
                <span>{stats.approvalRate}%</span>
                <span className="text-neutral-500">taxa de aprovação</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <span className="text-xl text-success-600">✅</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pendentes</p>
              <p className="stats-value">{stats.overdue + stats.pendingReview}</p>
              <div className="text-neutral-500 text-sm mt-2">
                {stats.overdue} atrasadas • {stats.pendingReview} revisão
              </div>
            </div>
            <div className="p-3 rounded-full bg-error-100">
              <span className="text-xl text-error-600">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="card">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">Tarefas Recentes</h3>
                <p className="text-neutral-600 mt-1">Últimas inspeções atribuídas</p>
              </div>
              <Link to="/tasks" className="text-primary-600 hover:text-primary-500 font-medium text-sm">
                Ver todas →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTasks.map((task) => {
                const status = getStatusBadge(task.status);
                const priority = getPriorityBadge(task.priority);
                return (
                  <div key={task.id} className="p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${priority.color}`}>
                          {priority.label}
                        </span>
                        <span className={`badge ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-500">📅 {task.dueDate}</span>
                    </div>
                    
                    <h4 className="font-medium text-neutral-900 mb-2">{task.title}</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-neutral-600">
                        <span className="mr-4">👨‍🔧 {task.technician}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-neutral-200 rounded-full mr-2">
                          <div 
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-700">{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Technicians */}
        <div className="card">
          <div className="p-6 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900">Técnicos em Destaque</h3>
                <p className="text-neutral-600 mt-1">Melhores desempenhos do mês</p>
              </div>
              <Link to="/technicians" className="text-primary-600 hover:text-primary-500 font-medium text-sm">
                Ver todos →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topTechnicians.map((tech) => (
                <div key={tech.id} className="flex items-center justify-between p-4 hover:bg-neutral-50 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className="avatar">
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-neutral-900">{tech.name}</p>
                      <p className="text-sm text-neutral-600">{tech.completed} tarefas concluídas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-1">
                      <div className="flex text-warning-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < Math.floor(tech.rating) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 font-bold text-neutral-900">{tech.rating}</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Eficiência: {tech.efficiency}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-neutral-600">
                  <span className="mr-2">⏰</span>
                  <span className="text-sm">Tempo médio: {stats.avgCompletionTime}</span>
                </div>
                <Link to="/scheduling" className="btn btn-primary btn-sm">
                  Atribuir Nova
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="card mt-8">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-xl font-semibold text-neutral-900">Resumo de Performance</h3>
          <p className="text-neutral-600 mt-1">Métricas gerais da semana</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{Math.floor(stats.completed / 5)}</div>
              <div className="text-sm text-neutral-600 mt-1">Média diária</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">{stats.approvalRate}%</div>
              <div className="text-sm text-neutral-600 mt-1">Taxa de aprovação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-600">{stats.inProgress}</div>
              <div className="text-sm text-neutral-600 mt-1">Em campo agora</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info-600">94%</div>
              <div className="text-sm text-neutral-600 mt-1">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;