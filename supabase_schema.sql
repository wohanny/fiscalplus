-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABELA DE PERFIS DE USUÁRIO
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('supervisora', 'analista')) DEFAULT 'analista',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- TABELA DE EMPRESAS
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  regime TEXT CHECK (regime IN ('Simples Nacional', 'Lucro Presumido', 'Lucro Real')) NOT NULL,
  assigned_analyst_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- TABELA DE TAREFAS MENSAIS
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  competence DATE NOT NULL, -- Ex: 2026-08-01 para a apuração de Agosto
  title TEXT NOT NULL,
  status TEXT CHECK (status IN ('Aguardando Documento', 'Em Apuração', 'Pendente de Revisão', 'Pronto para Envio', 'Concluído')) DEFAULT 'Aguardando Documento',
  internal_due_date DATE NOT NULL,
  legal_due_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- TABELA DE PERMISSÕES TEMPORÁRIAS (COBERTURA DE FÉRIAS/AUSÊNCIAS)
CREATE TABLE temporary_permissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  target_analyst_id UUID REFERENCES profiles(id), -- Carteira coberta
  covering_analyst_id UUID REFERENCES profiles(id), -- Analista cobrindo
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- ATIVAR ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURANÇA (RLS)
CREATE POLICY "Leitura pública para usuários autenticados" ON companies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Leitura pública de tarefas" ON tasks FOR SELECT USING (auth.role() = 'authenticated');
