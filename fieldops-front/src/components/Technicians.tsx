import { useState } from 'react';

interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string[];
  completedTasks: number;
  pendingTasks: number;
  rating: number;
  status: 'available' | 'busy' | 'offline' | 'on_break';
  lastActive: string;
  efficiency?: number;
  avatarColor?: string;
}

const Technicians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddTechnicianModal, setShowAddTechnicianModal] = useState(false);
  
  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@fieldops.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      specialization: ['Elétrica', 'Segurança', 'Preventiva'],
      completedTasks: 45,
      pendingTasks: 3,
      rating: 4.8,
      status: 'available',
      lastActive: 'Hoje, 09:30',
      efficiency: 92,
      avatarColor: '#3b82f6'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@fieldops.com',
      phone: '(11) 98888-8888',
      location: 'Campinas, SP',
      specialization: ['Refrigeração', 'Climatização', 'Manutenção'],
      completedTasks: 42,
      pendingTasks: 2,
      rating: 4.7,
      status: 'busy',
      lastActive: 'Hoje, 08:45',
      efficiency: 88,
      avatarColor: '#10b981'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@fieldops.com',
      phone: '(11) 97777-7777',
      location: 'Santos, SP',
      specialization: ['Hidráulica', 'Pintura', 'Estrutural'],
      completedTasks: 38,
      pendingTasks: 5,
      rating: 4.5,
      status: 'available',
      lastActive: 'Ontem, 17:30',
      efficiency: 85,
      avatarColor: '#8b5cf6'
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@fieldops.com',
      phone: '(11) 96666-6666',
      location: 'São José dos Campos, SP',
      specialization: ['Estrutural', 'Alvenaria', 'Fundações'],
      completedTasks: 35,
      pendingTasks: 4,
      rating: 4.3,
      status: 'offline',
      lastActive: '2 dias atrás',
      efficiency: 82,
      avatarColor: '#f59e0b'
    },
    {
      id: 5,
      name: 'Carlos Mendes',
      email: 'carlos.mendes@fieldops.com',
      phone: '(11) 95555-5555',
      location: 'Ribeirão Preto, SP',
      specialization: ['Civil', 'Topografia', 'Projetos'],
      completedTasks: 28,
      pendingTasks: 1,
      rating: 4.6,
      status: 'on_break',
      lastActive: 'Hoje, 12:00',
      efficiency: 90,
      avatarColor: '#ef4444'
    },
    {
      id: 6,
      name: 'Fernanda Lima',
      email: 'fernanda.lima@fieldops.com',
      phone: '(11) 94444-4444',
      location: 'Sorocaba, SP',
      specialization: ['Qualidade', 'Inspeção', 'Auditoria'],
      completedTasks: 31,
      pendingTasks: 3,
      rating: 4.4,
      status: 'available',
      lastActive: 'Hoje, 10:15',
      efficiency: 87,
      avatarColor: '#ec4899'
    }
  ]);

  const getStatusConfig = (status: Technician['status']) => {
    const configs = {
      'available': { 
        label: 'Disponível', 
        color: 'bg-success-500', 
        bgColor: 'bg-green-50', 
        textColor: 'text-green-700',
        icon: FiCheckCircle 
      },
      'busy': { 
        label: 'Ocupado', 
        color: 'bg-warning-500', 
        bgColor: 'bg-yellow-50', 
        textColor: 'text-yellow-700',
        icon: FiClock 
      },
      'offline': { 
        label: 'Offline', 
        color: 'bg-neutral-500', 
        bgColor: 'bg-neutral-100', 
        textColor: 'text-neutral-600',
        icon: FiClock 
      },
      'on_break': { 
        label: 'Pausa', 
        color: 'bg-purple-500', 
        bgColor: 'bg-purple-50', 
        textColor: 'text-purple-700',
        icon: FiClock 
      }
    };
    return configs[status];
  };

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         tech.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || tech.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAssignTask = (technicianId: number) => {
    const taskTitle = prompt('Digite o título da tarefa para atribuir:');
    if (taskTitle) {
      alert(`Tarefa "${taskTitle}" atribuída ao técnico!`);
    }
  };

  const handleSendMessage = (technicianId: number) => {
    const message = prompt('Digite sua mensagem:');
    if (message) {
      alert('Mensagem enviada!');
    }
  };

  const handleViewReport = (technicianId: number) => {
    alert('Abrindo relatório detalhado do técnico...');
  };

  const stats = {
    total: technicians.length,
    available: technicians.filter(t => t.status === 'available').length,
    busy: technicians.filter(t => t.status === 'busy').length,
    totalTasks: technicians.reduce((sum, tech) => sum + tech.completedTasks + tech.pendingTasks, 0),
    avgRating: (technicians.reduce((sum, tech) => sum + tech.rating, 0) / technicians.length).toFixed(1),
    totalCompleted: technicians.reduce((sum, tech) => sum + tech.completedTasks, 0)
  };

  const AddTechnicianModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">Adicionar Técnico</h3>
            <button 
              onClick={() => setShowAddTechnicianModal(false)}
              className="text-neutral-400 hover:text-neutral-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Nome Completo</label>
              <input type="text" className="form-input" placeholder="Nome do técnico" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">E-mail</label>
                <input type="email" className="form-input" placeholder="email@exemplo.com" />
              </div>
              <div>
                <label className="form-label">Telefone</label>
                <input type="tel" className="form-input" placeholder="(11) 99999-9999" />
              </div>
            </div>
            <div>
              <label className="form-label">Localização</label>
              <input type="text" className="form-input" placeholder="Cidade, Estado" />
            </div>
            <div>
              <label className="form-label">Especializações</label>
              <input type="text" className="form-input" placeholder="Separe por vírgula (Ex: Elétrica, Hidráulica)" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-neutral-200 flex gap-3 justify-end">
          <button 
            onClick={() => setShowAddTechnicianModal(false)}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              // Lógica para adicionar técnico
              setShowAddTechnicianModal(false);
            }}
          >
            Adicionar Técnico
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {showAddTechnicianModal && <AddTechnicianModal />}
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Técnicos</h2>
            <p className="text-neutral-600 mt-1">Gerencie sua equipe de campo</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="stats-card hover:border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.total}</div>
              <div className="stats-label">Técnicos</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.available}</div>
              <div className="stats-label">Disponíveis</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.busy}</div>
              <div className="stats-label">Ocupados</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.totalCompleted}</div>
              <div className="stats-label">Concluídas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.avgRating}</div>
              <div className="stats-label">Avaliação Média</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              
            </div>
            <div>
              <div className="stats-value">{stats.totalTasks}</div>
              <div className="stats-label">Total de Tarefas</div>
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
                placeholder="Buscar técnicos por nome, especialização ou localização..."
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
                <option value="available">Disponível</option>
                <option value="busy">Ocupado</option>
                <option value="on_break">Pausa</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <button 
              onClick={() => setShowAddTechnicianModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              
              Adicionar Técnico
            </button>
          </div>
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnicians.map((tech) => {
          const statusConfig = getStatusConfig(tech.status);
          const StatusIcon = statusConfig?.icon || FiCheckCircle;
          
          return (
            <div key={tech.id} className="card hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
              <div className="p-6">
                {/* Technician Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: tech.avatarColor }}
                    >
                      {tech.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-neutral-900">{tech.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.color }}></span>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                      <span className="text-xl">??</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-neutral-500">E-mail</div>
                      <div className="text-sm font-medium truncate">{tech.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                      
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Telefone</div>
                      <div className="text-sm font-medium">{tech.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                      
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Localização</div>
                      <div className="text-sm font-medium">{tech.location}</div>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-neutral-500 mb-2">
                    Especializações
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.specialization.map((spec) => (
                      <span key={spec} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{tech.completedTasks}</div>
                    <div className="text-xs text-neutral-600 mt-1">Concluídas</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">{tech.pendingTasks}</div>
                    <div className="text-xs text-neutral-600 mt-1">Pendentes</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{tech.efficiency}%</div>
                    <div className="text-xs text-neutral-600 mt-1">Eficiência</div>
                  </div>
                </div>

                {/* Rating and Last Active */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(tech.rating) ? 'fill-current' : 'text-neutral-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-neutral-900 ml-1">{tech.rating}</span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    Ativo: {tech.lastActive}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-neutral-200">
                  <button 
                    onClick={() => handleAssignTask(tech.id)}
                    className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                  >
                    
                    Atribuir
                  </button>
                  <button 
                    onClick={() => handleSendMessage(tech.id)}
                    className="p-3 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-lg transition"
                    title="Enviar mensagem"
                  >
                    
                  </button>
                  <button 
                    onClick={() => handleViewReport(tech.id)}
                    className="p-3 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-lg transition"
                    title="Ver relatório"
                  >
                    
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTechnicians.length === 0 && (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
            
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Nenhum técnico encontrado
          </h3>
          <p className="text-neutral-600 mb-6">
            Tente ajustar seus filtros ou adicionar um novo técnico
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
              className="btn btn-secondary"
            >
              Limpar filtros
            </button>
            <button 
              onClick={() => setShowAddTechnicianModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              
              Adicionar Primeiro Técnico
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredTechnicians.length > 0 && (
        <div className="card mt-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  Mostrando {filteredTechnicians.length} de {technicians.length} técnicos
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success-500"></div>
                  <span className="text-neutral-700">{stats.available} disponíveis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                  <span className="text-neutral-700">{stats.busy} ocupados</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-500"></div>
                  <span className="text-neutral-700">{technicians.filter(t => t.status === 'offline').length} offline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Technicians;
