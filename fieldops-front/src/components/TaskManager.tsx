import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  technician: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'review';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  client: string;
  location: string;
  createdAt: string;
  equipment?: string;
}

const TaskManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Inspeção Elétrica - Prédio A',
      description: 'Verificação completa do sistema elétrico',
      technician: 'João Silva',
      status: 'in_progress',
      dueDate: '2024-11-20',
      priority: 'high',
      client: 'Construtora ABC',
      location: 'Av. Paulista, 1000',
      createdAt: '2024-11-10',
      equipment: 'Multímetro digital'
    },
    {
      id: 2,
      title: 'Manutenção Preventiva - Refrigeração',
      description: 'Manutenção do sistema de refrigeração industrial',
      technician: 'Maria Santos',
      status: 'pending',
      dueDate: '2024-11-22',
      priority: 'medium',
      client: 'Indústria XYZ',
      location: 'Rua Industrial, 500',
      createdAt: '2024-11-11',
      equipment: 'Kit ferramentas'
    },
    {
      id: 3,
      title: 'Vistoria de Segurança - Área Industrial',
      description: 'Vistoria completa de segurança',
      technician: 'Pedro Costa',
      status: 'completed',
      dueDate: '2024-11-18',
      priority: 'high',
      client: 'Segurança Total Ltda',
      location: 'Complexo Industrial',
      createdAt: '2024-11-05',
      equipment: 'EPI completo'
    },
    {
      id: 4,
      title: 'Calibração de Instrumentos',
      description: 'Calibração de instrumentos de medição',
      technician: 'Ana Oliveira',
      status: 'overdue',
      dueDate: '2024-11-15',
      priority: 'high',
      client: 'Precisão Medições',
      location: 'Rua Técnica, 250',
      createdAt: '2024-11-01',
      equipment: 'Calibrador padrão'
    },
    {
      id: 5,
      title: 'Inspeção de Extintores',
      description: 'Inspeção trimestral de extintores',
      technician: 'Carlos Mendes',
      status: 'in_progress',
      dueDate: '2024-11-25',
      priority: 'low',
      client: 'Shopping Center',
      location: 'Centro Comercial',
      createdAt: '2024-11-12',
      equipment: 'Manômetro'
    },
    {
      id: 6,
      title: 'Análise de Qualidade - Água',
      description: 'Coleta e análise de amostras',
      technician: 'Fernanda Lima',
      status: 'review',
      dueDate: '2024-11-19',
      priority: 'medium',
      client: 'Água Pura S.A.',
      location: 'Estação de Tratamento',
      createdAt: '2024-11-08',
      equipment: 'Kit análise química'
    }
  ]);

  const getStatusConfig = (status: Task['status']) => {
    const configs = {
      'pending': { label: 'Pendente', color: 'bg-warning-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', icon: '⏰' },
      'in_progress': { label: 'Em andamento', color: 'bg-primary-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700', icon: '⏰' },
      'completed': { label: 'Concluída', color: 'bg-success-500', bgColor: 'bg-green-50', textColor: 'text-green-700', icon: '✓' },
      'overdue': { label: 'Atrasada', color: 'bg-error-500', bgColor: 'bg-red-50', textColor: 'text-red-700', icon: '⚠️' },
      'review': { label: 'Em revisão', color: 'bg-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700', icon: '👁️' }
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: Task['priority']) => {
    const configs = {
      'high': { label: 'Alta', color: 'bg-error-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
      'medium': { label: 'Média', color: 'bg-warning-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
      'low': { label: 'Baixa', color: 'bg-success-500', bgColor: 'bg-green-50', textColor: 'text-green-700' }
    };
    return configs[priority];
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleAssignTask = (id: number) => {
    const technician = prompt('Digite o nome do técnico para atribuir:');
    if (technician) {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, technician, status: 'in_progress' as const } : task
      ));
    }
  };

  const handleStatusChange = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  };

  const handleCreateTask = () => {
    setShowNewTaskModal(true);
  };

  const NewTaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">Nova Tarefa</h3>
            <button 
              onClick={() => setShowNewTaskModal(false)}
              className="text-neutral-400 hover:text-neutral-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Título da Tarefa</label>
              <input type="text" className="form-input" placeholder="Ex: Inspeção Elétrica" />
            </div>
            <div>
              <label className="form-label">Descrição</label>
              <textarea className="form-input min-h-[80px]" placeholder="Descreva a tarefa..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Cliente</label>
                <input type="text" className="form-input" placeholder="Nome do cliente" />
              </div>
              <div>
                <label className="form-label">Localização</label>
                <input type="text" className="form-input" placeholder="Endereço ou local" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Data de Vencimento</label>
                <input type="date" className="form-input" />
              </div>
              <div>
                <label className="form-label">Prioridade</label>
                <select className="form-input">
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Equipamento Necessário</label>
              <input type="text" className="form-input" placeholder="Equipamentos específicos" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-neutral-200 flex gap-3 justify-end">
          <button 
            onClick={() => setShowNewTaskModal(false)}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              // Lógica para criar nova tarefa
              setShowNewTaskModal(false);
            }}
          >
            Criar Tarefa
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {showNewTaskModal && <NewTaskModal />}
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <span className="text-xl">??</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Gerenciamento de Tarefas</h2>
            <p className="text-neutral-600 mt-1">Gerencie e atribua inspeções em campo</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="stats-card hover:border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="stats-value">{stats.total}</div>
              <div className="stats-label">Total de Tarefas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="text-xl">?</span>
            </div>
            <div>
              <div className="stats-value">{stats.inProgress}</div>
              <div className="stats-label">Em Andamento</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <span className="text-xl">?</span>
            </div>
            <div>
              <div className="stats-value">{stats.completed}</div>
              <div className="stats-label">Concluídas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <span className="text-xl">?</span>
            </div>
            <div>
              <div className="stats-value">{stats.pending}</div>
              <div className="stats-label">Pendentes</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <span className="text-xl">??</span>
            </div>
            <div>
              <div className="stats-value">{stats.overdue}</div>
              <div className="stats-label">Atrasadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-xl">??</span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
                placeholder="Buscar tarefas por título, técnico ou cliente..."
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-xl">??</span>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-input pl-10"
              >
                <option value="all">Todos status</option>
                <option value="pending">Pendente</option>
                <option value="in_progress">Em andamento</option>
                <option value="review">Em revisão</option>
                <option value="completed">Concluída</option>
                <option value="overdue">Atrasada</option>
              </select>
            </div>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="form-input"
            >
              <option value="all">Todas prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>

            <button 
              onClick={handleCreateTask}
              className="btn btn-primary flex items-center gap-2"
            >
              <span className="text-xl">?</span>
              Nova Tarefa
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => {
          const statusConfig = getStatusConfig(task.status);
          const priorityConfig = getPriorityConfig(task.priority);
          
          return (
            <div key={task.id} className="card hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityConfig.color }}></span>
                        {priorityConfig.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2 truncate">
                      {task.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-3">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Task Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-2">
                      <span className="text-xl">??</span>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Técnico</div>
                      <div className="text-sm font-medium">{task.technician}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-2">
                      <span className="text-xl">??</span>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Vencimento</div>
                      <div className={`text-sm font-medium ${task.status === 'overdue' ? 'text-error-600' : ''}`}>
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-2">
                      <span className="text-neutral-500 font-medium">C</span>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Cliente</div>
                      <div className="text-sm font-medium truncate">{task.client}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-2">
                      <span className="text-xl">??</span>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Local</div>
                      <div className="text-sm font-medium truncate">{task.location}</div>
                    </div>
                  </div>
                </div>

                {task.equipment && (
                  <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                    <div className="text-xs text-neutral-500 mb-1">Equipamento Necessário</div>
                    <div className="text-sm font-medium">{task.equipment}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div className="text-xs text-neutral-500">
                    Criada em {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleAssignTask(task.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Atribuir técnico"
                    >
                      <span className="text-xl">??</span>
                    </button>
                    <button 
                      onClick={() => handleStatusChange(task.id, 'completed')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Marcar como concluída"
                    >
                      <span className="text-xl">?</span>
                    </button>
                    <button 
                      onClick={() => handleStatusChange(task.id, 'review')}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                      title="Enviar para revisão"
                    >
                      <span className="text-xl">???</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Excluir tarefa"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
            <FiSearch className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-neutral-600 mb-6">
            Tente ajustar seus filtros ou criar uma nova tarefa
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedPriority('all');
              }}
              className="btn btn-secondary"
            >
              Limpar filtros
            </button>
            <button 
              onClick={handleCreateTask}
              className="btn btn-primary flex items-center gap-2"
            >
              <span className="text-xl">?</span>
              Criar Primeira Tarefa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
