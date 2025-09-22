
import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, FilePenLine, Gift, LayoutTemplate, Share2, Download, FileText } from 'lucide-react';

export type ComplementaryMaterial = {
  title: string;
  href: string;
  Icon: LucideIcon;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export type ModuleWithContent = Module & {
  complementaryMaterials?: ComplementaryMaterial[];
};

export const modules: ModuleWithContent[] = [
  {
    id: 'module1',
    title: 'MÓDULO 01 - Fluxo Prático',
    description: 'Aqui você aprende o passo a passo para transformar uma ideia simples em conteúdo visual, usando IA e uma ferramenta automática — sem complicação, sem precisar saber design.\n\nIdeal pra quem tem pouco tempo e quer começar a postar ainda hoje, com consistência e praticidade.',
    Icon: BrainCircuit,
    complementaryMaterials: [
      {
        title: "DOWNLOAD DO FIGMA DESKTOP",
        href: "https://www.figma.com/pt-br/downloads/",
        Icon: Download,
      }
    ]
  },
  {
    id: 'module2',
    title: 'MÓDULO 02 - Criação de Posts c/ I.A.',
    description: 'Descubra como usar prompts inteligentes para gerar textos prontos para redes sociais — mesmo que você esteja sem ideias ou com bloqueio criativo.',
    Icon: FilePenLine,
    complementaryMaterials: [
        {
            title: "ATHENA - A ASSISTENTE DE CRIAÇÃO DE CARROSSÉIS",
            href: "https://drive.google.com/file/d/1MBa9AlRKvyhrAXu1xmV_VYcVauxRykOl/view?usp=sharing",
            Icon: FileText
        }
    ]
  },
  {
    id: 'module3',
    title: 'MÓDULO 03 - Aplicação Visual Automática',
    description: 'Aprenda a aplicar seu conteúdo em um template visual profissional com apenas alguns cliques, direto no Figma — sem precisar saber design.',
    Icon: LayoutTemplate,
    complementaryMaterials: []
  },
  {
    id: 'module4',
    title: 'MÓDULO 04 - Exportação para Redes Sociais',
    description: 'Agora é só exportar seu conteúdo visual no formato certo para Instagram, LinkedIn ou onde quiser postar — pronto para publicar com consistência.',
    Icon: Share2,
    complementaryMaterials: []
  },
  {
    id: 'module5',
    title: 'MÓDULO 05 - Bônus Extras',
    description: 'Desbloqueie dicas e truques exclusivos para turbinar sua criação de conteúdo.',
    Icon: Gift,
    complementaryMaterials: []
  },
];
