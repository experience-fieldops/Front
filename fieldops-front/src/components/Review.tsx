import { useState } from 'react';
import { FiSearch, FiFilter, FiCheckCircle, FiX, FiEye, FiDownload, FiAlertCircle, FiClock, FiFileText, FiPercent, FiUser, FiMapPin, FiCalendar } from 'react-icons/fi';

interface Inspection {
  id: number;
  title: string;
  technician: string;
  client: string;
  location: string;
  completedDate: string;
  status: 'pending_review' | 'approved' | 'rejected' | 'needs_correction';
  itemsTotal: number;
  itemsCompleted: number;
  hasIssues: boolean;
  priority: 'high' | 'medium' | 'low';
  score?: number;
  issuesCount?: number;
  reviewDeadline?: string;
}

const Review = () => {
  const [inspections, setInspections] = useState<Inspection[]>([
    {
      id: 1,
      title: 'Inspeção Elétrica - Prédio A',
      technician: 'João Silva',
      client: 'Construtora ABC',
      location: 'Av. Paulista, 1000',
      completedDate: '2024-11-18',
      status: 'pending_review',
      itemsTotal: 24,
      itemsCompleted: 24,
      hasIssues: false,
      priority: 'high',
      score: 95,
      reviewDeadline: '2024-11-20'
    },
    {
      id: 2,
      title: 'Manutenção Preventiva - Refrigeração',
      technician: 'Maria Santos',
      client: 'Indústria XYZ',
      location: 'Rua Industrial, 500',
      completedDate: '2024-11-17',
      status: 'pending_review',
      itemsTotal: 18,
      itemsCompleted: 17,
      hasIssues: true,
      priority: 'medium',
      score: 89,
      issuesCount: 2,
      reviewDeadline: '2024-11-19'
    },
    {
      id: 3,
      title: 'Vistoria de Segurança - Área Industrial',
      technician: 'Pedro Costa',
      client: 'Segurança Total Ltda',
      location: 'Complexo Industrial',
      completedDate: '2024-11-16',
      status: 'approved',
      itemsTotal: 32,
      itemsCompleted: 32,
      hasIssues: false,
      priority: 'high',
      score: 98
    },
    {
      id: 4,
      title: 'Calibração de Instrumentos',
      technician: 'Ana Oliveira',
      client: 'Precisão Medições',
      location: 'Rua Técnica, 250',
      completedDate: '2024-11-15',
      status: 'rejected',
      itemsTotal: 15,
      itemsCompleted: 14,
      hasIssues: true,
      priority: 'high',
      score: 82,
      issuesCount: 3
    },
    {
      id: 5,
      title: 'Inspeção de Extintores',
      technician: 'Carlos Mendes',
      client: 'Shopping Center Plaza',
      location: 'Centro Comercial',
      completedDate: '2024-11-19',
      status: 'needs_correction',
      itemsTotal: 20,
      itemsCompleted: 19,
      hasIssues: true,
      priority: 'low',
      score: 88,
      issuesCount: 1,
      reviewDeadline: '2024-11-21'
    },
    {
      id: 6,
      title: 'Análise de Qualidade - Água',
      technician: 'Fernanda Lima',
      client: 'Água Pura S.A.',
      location: 'Estação de Tratamento',
      completedDate: '2024-11-18',
      status: 'approved',
      itemsTotal: 28,
      itemsCompleted: 28,
      hasIssues: false,
      priority: 'medium',
      score: 96
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const getStatusConfig = (status: Inspection['status']) => {
    const configs = {
      'pending_review': { 
        label: 'Pendente Revisão', 
        color: 'bg-warning-500', 
        bgColor: 'bg-yellow-50', 
        textColor: 'text-yellow-700',
        icon: FiClock 
      },
      'approved': { 
        label: 'Aprovada', 
        color: 'bg-success-500', 
        bgColor: 'bg-green-50', 
        textColor: 'text-green-700',
        icon: FiCheckCircle 
      },
      'rejected': { 
        label: 'Reprovada', 
        color: 'bg-error-500', 
        bgColor: 'bg-red-50', 
        textColor: 'text-red-700',
        icon: FiX 
      },
      'needs_correction': { 
        label: 'Necessita Correção', 
        color: 'bg-purple-600', 
        bgColor: 'bg-purple-50', 
        textColor: 'text-purple-700',
        icon: FiAlertCircle 
      }
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: Inspection['priority']) => {
    const configs = {
      'high': { label: 'Alta', color: 'bg-error-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
      'medium': { label: 'Média', color: 'bg-warning-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
      'low': { label: 'Baixa', color: 'bg-success-500', bgColor: 'bg-green-50', textColor: 'text-green-700' }
    };
    return configs[priority];
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || inspection.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || inspection.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (id: number) => {
    if (window.confirm('Tem certeza que deseja aprovar esta inspeção?')) {
      setInspections(inspections.map(inspection => 
        inspection.id === id ? { ...inspection, status: 'approved' as const } : inspection
      ));
    }
  };

  const handleReject = (id: number) => {
    const reason = prompt('Digite o motivo da reprovação:');
    if (reason) {
      setInspections(inspections.map(inspection => 
        inspection.id === id ? { ...inspection, status: 'rejected' as const } : inspection
      ));
    }
  };

  const handleRequestCorrection = (id: number) => {
    const feedback = prompt('Digite o feedback para correção:');
    if (feedback) {
      setInspections(inspections.map(inspection => 
        inspection.id === id ? { ...inspection, status: 'needs_correction' as const } : inspection
      ));
    }
  };

  const handleReviewDetails = (id: number) => {
    alert(`Abrindo detalhes da inspeção ${id}...`);
  };

  const handleExportReport = (id: number) => {
    alert(`Exportando relatório da inspeção ${id}...`);
  };

  const stats = {
    pending: inspections.filter(i => i.status === 'pending_review').length,
    approved: inspections.filter(i => i.status === 'approved').length,
    rejected: inspections.filter(i => i.status === 'rejected').length,
    needsCorrection: inspections.filter(i => i.status === 'needs_correction').length,
    total: inspections.length,
    avgScore: Math.round(inspections.reduce((sum, i) => sum + (i.score || 0), 0) / inspections.length),
    issuesCount: inspections.filter(i => i.hasIssues).length,
    overdueReviews: inspections.filter(i => 
      i.status === 'pending_review' && 
      i.reviewDeadline && 
      new Date(i.reviewDeadline) < new Date()
    ).length
  };

  const progressColor = (progress: number) => {
    if (progress >= 90) return 'bg-success-500';
    if (progress >= 70) return 'bg-warning-500';
    return 'bg-error-500';
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getProgressPercentage = (itemsCompleted: number, itemsTotal: number) => {
    return Math.round((itemsCompleted / itemsTotal) * 100);
  };

  const calculateTimeUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { days: Math.abs(diffDays), status: 'overdue' };
    if (diffDays === 0) return { days: 0, status: 'today' };
    return { days: diffDays, status: 'upcoming' };
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <FiCheckCircle className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Revisão de Inspeções</h2>
            <p className="text-neutral-600 mt-1">Aprove ou reprove inspeções concluídas pelos técnicos</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        <div className="stats-card hover:border-primary-200 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="stats-value">{stats.total}</div>
              <div className="stats-label">Total</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="stats-value">{stats.pending}</div>
              <div className="stats-label">Pendentes</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="stats-value">{stats.approved}</div>
              <div className="stats-label">Aprovadas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <FiX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="stats-value">{stats.rejected}</div>
              <div className="stats-label">Reprovadas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="stats-value">{stats.needsCorrection}</div>
              <div className="stats-label">Correções</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <FiPercent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="stats-value">{stats.avgScore}</div>
              <div className="stats-label">Pontuação Média</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="stats-value">{stats.issuesCount}</div>
              <div className="stats-label">Com Problemas</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card hover:border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
              <FiClock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="stats-value">{stats.overdueReviews}</div>
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
                <FiSearch className="text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
                placeholder="Buscar inspeções por título, técnico ou cliente..."
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
                <option value="pending_review">Pendente revisão</option>
                <option value="approved">Aprovadas</option>
                <option value="rejected">Reprovadas</option>
                <option value="needs_correction">Necessita correção</option>
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

            <button className="btn btn-primary flex items-center gap-2">
              <FiDownload className="w-4 h-4" />
              Exportar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInspections.map((inspection) => {
          const statusConfig = getStatusConfig(inspection.status);
          const priorityConfig = getPriorityConfig(inspection.priority);
          const StatusIcon = statusConfig?.icon || FiCheckCircle;
          const progress = getProgressPercentage(inspection.itemsCompleted, inspection.itemsTotal);
          const deadlineInfo = calculateTimeUntilDeadline(inspection.reviewDeadline);
          
          return (
            <div key={inspection.id} className="card hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityConfig.color }}></span>
                        {priorityConfig.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                      {inspection.hasIssues && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          <FiAlertCircle className="w-3 h-3" />
                          {inspection.issuesCount || 1} {inspection.issuesCount === 1 ? 'problema' : 'problemas'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-lg mb-2 truncate">
                      {inspection.title}
                    </h3>
                  </div>
                </div>

                {/* Progress & Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-neutral-700">
                      Progresso: {inspection.itemsCompleted}/{inspection.itemsTotal} itens
                    </div>
                    <div className="text-sm font-bold" className={`${scoreColor(inspection.score || 0)}`}>
                      Pontuação: {inspection.score || 0}%
                    </div>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${progressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                      <span className="text-neutral-500 font-medium">C</span>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Cliente</div>
                      <div className="text-sm font-medium truncate">{inspection.client}</div>
                    </div>
                  </div>
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
                      <FiCalendar className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Concluída</div>
                      <div className="text-sm font-medium">
                        {new Date(inspection.completedDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deadline Warning */}
                {deadlineInfo && (
                  <div className={`mb-4 p-3 rounded-lg ${deadlineInfo.status === 'overdue' ? 'bg-red-50 border border-red-200' : deadlineInfo.status === 'today' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex items-center gap-2">
                      <FiClock className={`w-4 h-4 ${deadlineInfo.status === 'overdue' ? 'text-red-600' : deadlineInfo.status === 'today' ? 'text-yellow-600' : 'text-blue-600'}`} />
                      <span className={`text-sm font-medium ${deadlineInfo.status === 'overdue' ? 'text-red-700' : deadlineInfo.status === 'today' ? 'text-yellow-700' : 'text-blue-700'}`}>
                        {deadlineInfo.status === 'overdue' ? `Atrasada ${deadlineInfo.days} dia${deadlineInfo.days === 1 ? '' : 's'}` :
                         deadlineInfo.status === 'today' ? 'Prazo finaliza hoje' :
                         `Prazo: ${deadlineInfo.days} dia${deadlineInfo.days === 1 ? '' : 's'}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <div className="text-xs text-neutral-500">
                    ID: #{inspection.id}
                  </div>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleReviewDetails(inspection.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Ver detalhes"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => handleExportReport(inspection.id)}
                      className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition"
                      title="Exportar relatório"
                    >
                      <FiDownload className="w-4 h-4" />
                    </button>
                    
                    {inspection.status === 'pending_review' && (
                      <>
                        <button 
                          onClick={() => handleApprove(inspection.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Aprovar"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRequestCorrection(inspection.id)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="Solicitar correção"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleReject(inspection.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Reprovar"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    {inspection.status === 'needs_correction' && (
                      <button 
                        onClick={() => handleReviewDetails(inspection.id)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                        title="Ver correções necessárias"
                      >
                        <FiFileText className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredInspections.length === 0 && (
        <div className="card p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
            <FiCheckCircle className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Nenhuma inspeção encontrada
          </h3>
          <p className="text-neutral-600 mb-6">
            Todas as inspeções foram revisadas ou não há correspondências com os filtros
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
          </div>
        </div>
      )}

      {/* Review Guidelines */}
      <div className="card mt-8">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <FiFileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Diretrizes de Revisão</h3>
              <p className="text-neutral-600 text-sm">Critérios para aprovação/reprovação</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <h4 className="font-semibold text-neutral-900">Aprovar quando:</h4>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Todos os itens obrigatórios foram preenchidos corretamente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Evidências fotográficas estão adequadas e claras</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Não há irregularidades críticas de segurança</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Documentação completa e assinada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Pontuação mínima de 85% atingida</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <FiX className="w-3 h-3 text-red-600" />
                </div>
                <h4 className="font-semibold text-neutral-900">Solicitar correção quando:</h4>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Itens obrigatórios incompletos ou mal preenchidos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Evidências insuficientes ou de baixa qualidade</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Problemas não críticos que requerem atenção</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Pontuação entre 70% e 85%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;