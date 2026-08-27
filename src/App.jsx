import React, { useState, useEffect } from 'react';
import { 
  Building2, Calendar, CheckSquare, Shield, BookOpen, 
  Newspaper, MessageSquare, LogOut, Users, AlertCircle, Plus 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('empresas');
  const [userRole, setUserRole] = useState('supervisora'); // 'supervisora' ou 'analista'
  const [userName, setUserName] = useState('Mariana Silva');

  // MOCK DATA PARA DEMONSTRAÇÃO VISUAL
  const [companies] = useState([
    { id: 1, name: 'Comércio de Alimentos LTDA', cnpj: '12.345.678/0001-90', regime: 'Simples Nacional', analyst: 'Carlos Andrade' },
    { id: 2, name: 'Indústria Metalúrgica SA', cnpj: '98.765.432/0001-10', regime: 'Lucro Real', analyst: 'Beatriz Costa' },
    { id: 3, name: 'Serviços Médicos SS', cnpj: '45.678.910/0001-33', regime: 'Lucro Presumido', analyst: 'Carlos Andrade' },
  ]);

  const [tasks] = useState([
    { id: 101, company: 'Comércio de Alimentos LTDA', title: 'Apuração PGDAS-D', status: 'Em Apuração', internalDue: '2026-08-15', legalDue: '2026-08-20' },
    { id: 102, company: 'Indústria Metalúrgica SA', title: 'EFD ICMS IPI', status: 'Aguardando Documento', internalDue: '2026-08-12', legalDue: '2026-08-15' },
    { id: 103, company: 'Serviços Médicos SS', title: 'Emissão de DARF Pis/Cofins', status: 'Concluído', internalDue: '2026-08-18', legalDue: '2026-08-25' },
  ]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* SIDEBAR LATERAL - AZUL MARINHO */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-blue-400">FiscalHub Pro</h1>
            <p className="text-xs text-slate-400 mt-1">Gestão & Apuração Fiscal</p>
          </div>

          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('empresas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'empresas' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Building2 size={18} /> Empresas & Apurações
            </button>

            <button 
              onClick={() => setActiveTab('calendario')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'calendario' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Calendar size={18} /> Calendário SLAs
            </button>

            {userRole === 'supervisora' && (
              <button 
                onClick={() => setActiveTab('supervisao')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'supervisao' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <Shield size={18} /> Área da Supervisão
              </button>
            )}

            <button 
              onClick={() => setActiveTab('wiki')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'wiki' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <BookOpen size={18} /> Base de Conhecimento
            </button>

            <button 
              onClick={() => setActiveTab('reforma')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'reforma' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Newspaper size={18} /> Reforma Tributária
            </button>

            <button 
              onClick={() => setActiveTab('mural')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'mural' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <MessageSquare size={18} /> Mural de Recados
            </button>
          </nav>
        </div>

        {/* PROFILE INFO & ALTERNADOR DE PERFIL */}
        <div className="p-4 border-t border-slate-800">
          <div className="mb-3 px-2">
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-blue-400 capitalize">{userRole}</p>
          </div>
          <button 
            onClick={() => setUserRole(userRole === 'supervisora' ? 'analista' : 'supervisora')}
            className="w-full text-xs bg-slate-800 hover:bg-slate-700 py-2 rounded text-slate-300 mb-2 transition"
          >
            Alternar para: {userRole === 'supervisora' ? 'Analista' : 'Supervisora'}
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* CABEÇALHO DA TELA */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h2>
            <p className="text-sm text-slate-500">Competência Vigente: Agosto / 2026</p>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition">
            <Plus size={16} /> Nova Empresa / Importar CSV
          </button>
        </div>

        {/* CONTEÚDO: EMPRESAS E APURAÇÃO */}
        {activeTab === 'empresas' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Carteira de Empresas & Status de Apuração</span>
                <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded hover:bg-slate-800">Replicar Tarefas p/ Próximo Mês</button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500 uppercase">
                    <th className="p-4">Empresa</th>
                    <th className="p-4">Regime</th>
                    <th className="p-4">Analista Responsável</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {companies.map((company) => (
                    <tr key={company.id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">
                        {company.name}
                        <div className="text-xs text-slate-400 font-normal">{company.cnpj}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {company.regime}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{company.analyst}</td>
                      <td className="p-4">
                        <button className="text-xs text-blue-600 font-semibold hover:underline">Ver Checklist</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEÚDO: ÁREA DA SUPERVISÃO */}
        {activeTab === 'supervisora' && userRole === 'supervisora' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={18} className="text-blue-600" /> Cobertura de Ausências / Férias
              </h3>
              <p className="text-xs text-slate-500 mb-4">Conceda acesso temporário de edição da carteira de um analista para outro durante períodos de ausência.</p>
              <button className="w-full bg-slate-900 text-white text-xs py-2 rounded font-medium">Nova Permissão Temporária</button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" /> Fila de Revisão & Aprovação
              </h3>
              <p className="text-xs text-slate-500 mb-4">Aprovações pendentes de encerramento da competência de apuração.</p>
              <div className="text-sm font-semibold text-slate-600"> Nenhuma pendência para aprovação no momento.</div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
