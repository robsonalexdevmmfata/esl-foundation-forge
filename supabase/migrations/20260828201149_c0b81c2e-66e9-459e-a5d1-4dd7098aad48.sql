CREATE TYPE public.app_role AS ENUM ('admin','editor','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.site_content (
  id integer PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_content_singleton CHECK (id = 1)
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
ON public.site_content FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert site content"
ON public.site_content FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
ON public.site_content FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text,
  servico text,
  mensagem text,
  origem text NOT NULL DEFAULT 'site',
  status text NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view leads"
ON public.leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_content (id, data) VALUES (1, '{}'::jsonb);

INSERT INTO public.leads (nome, email, telefone, servico, mensagem, origem, status, created_at) VALUES
('Marina Alves','marina.alves@email.com','(11) 98812-4410','Construção Residencial','Quero orçamento para uma casa de 220m2.','site','ganho', now() - interval '150 days'),
('Carlos Menezes','carlos@construtoranorte.com','(11) 97741-2280','Gestão de Projetos','Preciso de gerenciamento de obra corporativa.','whatsapp','em_contato', now() - interval '140 days'),
('Fernanda Lima','fernanda.lima@email.com','(11) 99120-8877','Retrofit & Reformas','Reforma de fachada de edifício.','site','novo', now() - interval '120 days'),
('Grupo Vertex','contato@vertex.com.br','(11) 3322-1100','Construção Comercial','Loja âncora em shopping.','whatsapp','ganho', now() - interval '110 days'),
('Ricardo Souza','ricardo.souza@email.com','(11) 98230-4412','Manutenção Predial','Contrato anual de facilities.','site','em_contato', now() - interval '95 days'),
('Ana Beatriz','ana.b@email.com','(11) 99887-1122','Construção Residencial','Sobrado em condomínio fechado.','site','ganho', now() - interval '80 days'),
('Logística BR','obras@logisticabr.com','(11) 3055-7788','Construção Comercial','Galpão de 4.000m2.','whatsapp','novo', now() - interval '70 days'),
('Paulo Ferreira','paulo.f@email.com','(11) 98444-9021','Consultoria & Laudos','Laudo estrutural urgente.','site','perdido', now() - interval '60 days'),
('Juliana Prado','juliana@email.com','(11) 99010-3322','Retrofit & Reformas','Retrofit de lobby corporativo.','whatsapp','ganho', now() - interval '45 days'),
('Condomínio Alfa','sindico@alfa.com.br','(11) 3777-6655','Manutenção Predial','Manutenção preventiva mensal.','site','em_contato', now() - interval '30 days'),
('Eduardo Ramos','eduardo.ramos@email.com','(11) 98555-4433','Gestão de Projetos','Viabilidade de terreno.','site','novo', now() - interval '20 days'),
('Tech Offices','projetos@techoffices.com','(11) 3111-9090','Construção Comercial','Sede nova de 1.200m2.','whatsapp','em_contato', now() - interval '12 days'),
('Sandra Nogueira','sandra.n@email.com','(11) 99666-2211','Construção Residencial','Casa térrea sustentável.','site','novo', now() - interval '6 days'),
('Marcos Vinícius','marcos.v@email.com','(11) 98123-7766','Manutenção Predial','Orçamento de pintura predial.','whatsapp','novo', now() - interval '2 days');