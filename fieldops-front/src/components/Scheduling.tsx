import { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiCalendar, FiClock, FiMapPin, FiUser, FiAlertCircle, FiCheckCircle, FiX, FiEdit, FiEye, FiPlay, FiDownload, FiShare2 } from 'react-icons/fi';

interface ScheduledInspection {
  id: number;
  title: string;
  client: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  technician: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  equipment?: string;
  notes?: string;
}

const Scheduling = () => {
  const [inspections, setInspections] = useState<ScheduledInspection[]>([
    {
      id: 1,
      title: 'Inspeção Elétrica - Prédio A',
      client: 'Construtora ABC',
      location: 'Av. Paulista, 1000',
      scheduledDate: '2024-11-20',
      scheduledTime: '09:00',
      technician: 'João Silva',
      status: 'scheduled',
      priority: 'high',
      estimatedDuration: '4 horas',
      equipment: 'Multímetro digital, testador de tensão',
      notes: 'Acesso restrito, necessário crachá de identificação'
    },
    {
      id: 2,
      title: 'Manutenção Preventiva - Refrigeração',
      client: 'Indústria XYZ',
      location: 'Rua Industrial, 500',
      scheduledDate: '2024-11-22',
      scheduledTime: '14:00',
      technician: 'Maria Santos',
      status: 'scheduled',
      priority: 'medium',
      estimatedDuration: '3 horas',
      equipment: 'Kit manutenção refrigeração'
    },
    {
      id: 3,
      title: 'Vistoria de Segurança - Área Industrial',
      client: 'Segurança Total Ltda',
      location: 'Complexo Industrial',
      scheduledDate: '2024-11-19',
      scheduledTime: '08:30',
      technician: 'Pedro Costa',
      status: 'in_progress',
      priority: 'high',
      estimatedDuration: '6 horas',
      equipment: 'EPI completo, checklist de segurança'
    },
    {
      id: 4,
      title: 'Calibração de Instrumentos',
      client: 'Precisão Medições',
      location: 'Rua Técnica, 250',
      scheduledDate: '2024-11-21',
      scheduledTime: '10:00',
      technician: 'Ana Oliveira',
      status: 'scheduled',
      priority: 'high',
      estimatedDuration: '2 horas',
      equipment: 'Calibrador padrão, termômetro digital'
    },
    {
      id: 5,
      title: 'Instalação de Sistema de Segurança',
      client: 'TechGuard Solutions',
      location: 'Centro Empresarial',
      scheduledDate: '2024-11-18',
      scheduledTime: '13:00',
      technician: 'Carlos Mendes',
      status: 'delayed',
      priority: 'medium',
      estimatedDuration: '8 horas',
      notes: 'Atraso devido a entrega de equipamentos'
    },
    {
      id: 6,
      title: 'Inspeção de Extintores',
      client: 'Shopping Center Plaza',
      location: 'Centro Comercial',
      scheduledDate: '2024-11-23',
      scheduledTime: '11:00',
      technician: 'Fernanda Lima',
      status: 'completed',
      priority: 'low',
      estimatedDuration: '2 horas'
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);
  const [calendarView, setCalendarView] = useState<'list' | 'week' | 'month'>('list');
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    client: '',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
    technician: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    estimatedDuration: '2 horas',
    equipment: '',
    notes: ''
  });

  const getStatusConfig = (status: ScheduledInspection['status']) => {
    const configs = {
      'scheduled': { 
        label: 'Agendada', 
        color: 'bg-primary-600', 
        bgColor: 'bg-blue-50', 
        textColor: 'text-blue-700',
        icon: FiCalendar 
      },
      'in_progress': { 
        label: 'Em andamento', 
        color: 'bg-warning-500', 
        bgColor: 'bg-yellow-50', 
        textColor: 'text-yellow-700',
        icon: FiClock 
      },
      'completed': { 
        label: 'Concluída', 
        color: 'bg-success-500', 
        bgColor: 'bg-green-50', 
        textColor: 'text-green-700',
        icon: FiCheckCircle 
      },
      'cancelled': { 
        label: 'Cancelada', 
        color: 'bg-error-500', 
        bgColor: 'bg-red-50', 
        textColor: 'text-red-700',
        icon: FiX 
      },
      'delayed': { 
        label: 'Atrasada', 
        color: 'bg-purple-600', 
        bgColor: 'bg-purple-50', 
        textColor: 'text-purple-700',
        icon: FiAlertCircle 
      }
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: ScheduledInspection['priority']) => {
    const configs = {
      'high': { label: 'Alta', color: 'bg-error-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
      'medium': { label: 'Média', color: 'bg-warning-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
      'low': { label: 'Baixa', color: 'bg-success-500', bgColor: 'bg-green-50', textColor: 'text-green-700' }
    };
    return configs[priority];
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || inspection.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = inspections.length + 1;
    const newInspection: ScheduledInspection = {
      id: newId,
      title: newSchedule.title,
      client: newSchedule.client,
      location: newSchedule.location,
      scheduledDate: newSchedule.scheduledDate,
      scheduledTime: newSchedule.scheduledTime,
      technician: newSchedule.technician,
      status: 'scheduled',
      priority: newSchedule.priority,
      estimatedDuration: newSchedule.estimatedDuration,
      equipment: newSchedule.equipment,
      notes: newSchedule.notes
    };

    setInspections([...inspections, newInspection]);
    setNewSchedule({
      title: '',
      client: '',
      location: '',
      scheduledDate: '',
      scheduledTime: '',
      technician: '',
      priority: 'medium',
      estimatedDuration: '2 horas',
      equipment: '',
      notes: ''
    });
    setShowNewScheduleModal(false);
  };

  const handleCancelSchedule = (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setInspections(inspections.map(inspection => 
        inspection.id === id ? { ...inspection, status: 'cancelled' as const } : inspection
      ));
    }
  };

  const handleReschedule = (id: number) => {
    const newDate = prompt('Digite a nova data (YYYY-MM-DD):');
    const newTime = prompt('Digite o novo horário (HH:MM):');
    
    if (newDate && newTime) {
      setInspections(inspections.map(inspection => 
        inspection.id === id ? { 
          ...inspection, 
          scheduledDate: newDate,
          scheduledTime: newTime
        } : inspection
      ));
    }
  };

  const handleStartInspection = (id: number) => {
    setInspections(inspections.map(inspection => 
      inspection.id === id ? { ...inspection, status: 'in_progress' as const } : inspection
    ));
    alert('Inspeção iniciada! O técnico foi notificado.');
  };

  const handleCompleteInspection = (id: number) => {
    setInspections(inspections.map(inspection => 
      inspection.id === id ? { ...inspection, status: 'completed' as const } : inspection
    ));
    alert('Inspeção marcada como concluída!');
  };

  const stats = {
    scheduled: inspections.filter(i => i.status === 'scheduled').length,
    inProgress: inspections.filter(i => i.status === 'in_progress').length,
    completed: inspections.filter(i => i.status === 'completed').length,
    cancelled: inspections.filter(i => i.status === 'cancelled').length,
    delayed: inspections.filter(i => i.status === 'delayed').length,
    total: inspections.length
  };

  const availableTechnicians = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Mendes', 'Fernanda Lima'];

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString('pt-BR'),
      day: dateObj.getDate(),
      month: dateObj.toLocaleDateString('pt-BR', { month: 'short' }),
      dayName: dateObj.toLocaleDateString('pt-BR', { weekday: 'short' }),
      time: time
    };
  };

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const NewScheduleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Novo Agendamento</h3>
                <p className="text-neutral-600 text-sm">Preencha os dados da inspeção</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNewScheduleModal(false)}
              className="text-neutral-400 hover:text-neutral-600 transition"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleCreateSchedule} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Título da Inspeção *</label>
              <input
                type="text"
                name="title"
                value={newSchedule.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ex: Inspeção Elétrica - Prédio A"
                required
              />
            </div>

            <div>
              <label className="form-label">Cliente *</label>
              <input
                type="text"
                name="client"
                value={newSchedule.client}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Nome do cliente"
                required
              />
            </div>

            <div>
              <label className="form-label">Local *</label>
              <input
                type="text"
                name="location"
                value={newSchedule.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Endereço completo"
                required
              />
            </div>

            <div>
              <label className="form-label">Técnico *</label>
              <select
                name="technician"
                value={newSchedule.technician}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Selecione um técnico</option>
                {availableTechnicians.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Data *</label>
              <input
                type="date"
                name="scheduledDate"
                value={newSchedule.scheduledDate}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Horário *</label>
              <input
                type="time"
                name="scheduledTime"
                value={newSchedule.scheduledTime}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Prioridade</label>
              <select
                name="priority"
                value={newSchedule.priority}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>

            <div>
              <label className="form-label">Duração Estimada</label>
              <select
                name="estimatedDuration"
                value={newSchedule.estimatedDuration}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="1 hora">1 hora</option>
                <option value="2 horas">2 horas</option>
                <option value="3 horas">3 horas</option>
                <option value="4 horas">4 horas</option>
                <option value="6 horas">6 horas</option>
                <option value="8 horas">8 horas</option>
              </select>
            </div>

            <div>
              <label className="form-label">Equipamento Necessário</label>
              <input
                type="text"
                name="equipment"
                value={newSchedule.equipment}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Equipamentos específicos necessários"
              />
            </div>

            <div className="md:col-span-2">
              <label className="form-label">Observações</label>
              <textarea
                name="notes"
                value={newSchedule.notes}
                onChange={handleInputChange}
                className="form-input min-h-[100px]"
                placeholder="Observações importantes ou instruções especiais..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setShowNewScheduleModal(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
            >
              <FiCalendar className="w-4 h-4" />
              Agendar Inspeção
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {showNewScheduleModal && <NewScheduleModal />}
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <FiCalendar className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Agendamento de Inspeções</h2>
            <p className="text-neutral-600 mt-1">Planeje e agende inspeções para sua equipe</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="stats-card hover:border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="stats-value">{stats.total}</div>
              <div className="stats-label">Total</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="stats-value">{stats.scheduled}</div>
              <div className="stats-label">Agendadas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <FiClock className="w-6 h-6 text-yellow-600" />
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
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="stats-value">{stats.completed}</div>
              <div className="stats-label">Concluídas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="stats-value">{stats.delayed}</div>
              <div className="stats-label">Atrasadas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-50 flex items-center justify-center">
              <FiX className="w-6 h-6 text-neutral-600" />
            </div>
            <div>
              <div className="stats-value">{stats.cancelled}</div>
              <div className="stats-label">Canceladas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar with View Toggle */}
      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
                placeholder="Buscar agendamentos por título, cliente ou técnico..."
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-neutral-400" />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-input pl-10"
              >
                <option value="all">Todos status</option>
                <option value="scheduled">Agendadas</option>
                <option value="in_progress">Em andamento</option>
                <option value="completed">Concluídas</option>
                <option value="delayed">Atrasadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>

            <div className="flex bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setCalendarView('list')}
                className={`px-3 py-2 text-sm font-medium rounded transition ${calendarView === 'list' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                Lista
              </button>
              <button
                onClick={() => setCalendarView('week')}
                className={`px-3 py-2 text-sm font-medium rounded transition ${calendarView === 'week' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                Semana
              </button>
              <button
                onClick={() => setCalendarView('month')}
                className={`px-3 py-2 text-sm font-medium rounded transition ${calendarView === 'month' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                Mês
              </button>
            </div>

            <button 
              onClick={() => setShowNewScheduleModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Novo Agendamento
            </button>
          </div>
        </div>
      </div>

      {/* Week Calendar View */}
      {calendarView === 'week' && (
        <div className="card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Calendário Semanal</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">
                  <FiCalendar className="w-4 h-4" />
                </button>
                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">
                  <FiDownload className="w-4 h-4" />
                </button>
                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">
                  <FiShare2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => {
                const dayInspections = inspections.filter(inspection => 
                  new Date(inspection.scheduledDate).toDateString() === day.toDateString()
                );
                
                return (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-neutral-900 mb-2">
                      {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </div>
                    <div className="text-xs text-neutral-600 mb-2">
                      {day.getDate()}/{day.getMonth() + 1}
                    </div>
                    <div className="h-32 border rounded-lg p-2 overflow-y-auto">
                      {dayInspections.map(inspection => (
                        <div key={inspection.id} className="text-xs p-2 mb-1 bg-blue-50 rounded truncate border-l-2 border-blue-500">
                          <div className="font-medium">{inspection.scheduledTime}</div>
                          <div className="truncate">{inspection.title.substring(0, 15)}...</div>
                        </div>
                      ))}
                      {dayInspections.length === 0 && (
                        <div className="text-xs text-neutral-400 h-full flex items-center justify-center">
                          Sem agendamentos
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Inspections List */}
      {(calendarView === 'list' || calendarView === 'month') && (
        <div className="space-y-4">
          {filteredInspections.map((inspection) => {
            const statusConfig = getStatusConfig(inspection.status);
            const priorityConfig = getPriorityConfig(inspection.priority);
            const datetime = formatDateTime(inspection.scheduledDate, inspection.scheduledTime);
            const StatusIcon = statusConfig?.icon || FiCalendar;
            
            return (
              <div key={inspection.id} className="card hover:shadow-md transition-all duration-300 hover:scale-[1.005]">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityConfig.color }}></span>
                          {priorityConfig.label}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-lg mb-2">
                        {inspection.title}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        <span className="font-medium">Cliente:</span> {inspection.client}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                          <FiCalendar className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-neutral-900">
                            {datetime.day} {datetime.month}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {datetime.dayName}, {datetime.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center text-neutral-600">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                        <FiMapPin className="w-4 h-4 text-neutral-500" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Local</div>
                        <div className="text-sm font-medium truncate">{inspection.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                        <FiUser className="w-4 h-4 text-neutral-500" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Técnico</div>
                        <div className="text-sm font-medium">{inspection.technician}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center mr-3">
                        <FiClock className="w-4 h-4 text-neutral-500" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Duração</div>
                        <div className="text-sm font-medium">{inspection.estimatedDuration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(inspection.equipment || inspection.notes) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {inspection.equipment && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xs font-medium text-blue-600 mb-1">Equipamento</div>
                          <div className="text-sm">{inspection.equipment}</div>
                        </div>
                      )}
                      {inspection.notes && (
                        <div className="p-3 bg-neutral-50 rounded-lg">
                          <div className="text-xs font-medium text-neutral-600 mb-1">Observações</div>
                          <div className="text-sm">{inspection.notes}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div className="text-xs text-neutral-500">
                      ID: #{inspection.id}
                    </div>
                    
                    <div className="flex gap-1">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Ver detalhes"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      
                      {inspection.status === 'scheduled' && (
                        <>
                          <button 
                            onClick={() => handleReschedule(inspection.id)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                            title="Reagendar"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleStartInspection(inspection.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Iniciar inspeção"
                          >
                            <FiPlay className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleCancelSchedule(inspection.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Cancelar"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      {inspection.status === 'in_progress' && (
                        <button 
                          onClick={() => handleCompleteInspection(inspection.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Marcar como concluída"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredInspections.length === 0 && (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
            <FiCalendar className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Nenhum agendamento encontrado
          </h3>
          <p className="text-neutral-600 mb-6">
            Crie seu primeiro agendamento ou ajuste os filtros
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
              onClick={() => setShowNewScheduleModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Criar Primeiro Agendamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;