
import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, FilePenLine, Gift, LayoutTemplate, Share2, Download, FileText, type LucideProps } from 'lucide-react';

export type ComplementaryMaterial = {
  title: string;
  href: string;
  iconName: keyof typeof import('lucide-react');
};

export type Lesson = {
  title: string;
  videoUrl?: string;
  youtubeVideoId?: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export type ModuleWithContent = Module & {
  lessons?: Lesson[];
  complementaryMaterials?: ComplementaryMaterial[];
};

export const modules: ModuleWithContent[] = [
  {
    id: 'module1',
    title: 'MÓDULO 01 - Fluxo Prático',
    description: 'Aqui você aprende o passo a passo para transformar uma ideia simples em conteúdo visual, usando IA e uma ferramenta automática — sem complicação, sem precisar saber design.\n\nIdeal pra quem tem pouco tempo e quer começar a postar ainda hoje, com consistência e praticidade.',
    Icon: BrainCircuit,
    lessons: [
      { title: 'Instalação do Figma Desktop', youtubeVideoId: 'f6s8q3o4Tgg' },
      { title: 'Instalação do Plugin TURBOCONTEÚDO', youtubeVideoId: 'LJH39t3Sg-w' }
    ],
    complementaryMaterials: [
      {
        title: "DOWNLOAD DO FIGMA DESKTOP",
        href: "https://www.figma.com/pt-br/downloads/",
        iconName: "Download",
      },
      {
        title: "PLUGIN TURBOCONTEÚDO",
        href: "https://drive.google.com/file/d/10jmodtHqgEUnaT7ZPghqOoIn8igXP5pW/view?usp=sharing",
        iconName: "FileText",
      }
    ]
  },
  {
    id: 'module2',
    title: 'MÓDULO 02 - Criação de Posts c/ I.A.',
    description: 'Descubra como usar prompts inteligentes para gerar textos prontos para redes sociais — mesmo que você esteja sem ideias ou com bloqueio criativo.',
    Icon: FilePenLine,
    lessons: [
      { title: 'PROMPT ATHENA PARA CRIAR CARROSÉIS VIRAIS', youtubeVideoId: 'dQw4w9WgXcQ' },
      { title: 'PROMPT ESTAGIÁRIA PARA ORGANIZAR O CONTEÚDO NO FORMATO ADEQUADO', youtubeVideoId: 'dQw4w9WgXcQ' }
    ],
    complementaryMaterials: [
        {
            title: "ATHENA - A ASSISTENTE DE CRIAÇÃO DE CARROSSÉIS",
            href: "https://drive.google.com/file/d/1MBa9AlRKvyhrAXu1xmV_VYcVauxRykOl/view?usp=sharing",
            iconName: "FileText"
        },
        {
            title: "ESTAGIÁRIA - Prompt de Formatação Carrossel",
            href: "https://drive.google.com/file/d/1RirgnQflG5Hr51yGENMOWa1lTF2r1Vyg/view?usp=sharing",
            iconName: "FileText"
        }
    ]
  },
  {
    id: 'module3',
    title: 'MÓDULO 03 - Aplicação Visual Automática',
    description: 'Aprenda a aplicar seu conteúdo em um template visual profissional com apenas alguns cliques, direto no Figma — sem precisar saber design.',
    Icon: LayoutTemplate,
    lessons: [
      { title: 'INSTALAÇÃO DE TEMPLATE E FONTES', youtubeVideoId: 'dQw4w9WgXcQ' },
      { title: 'UTILIZAÇÃO DO PLUGIN NO FIGMA', youtubeVideoId: 'dQw4w9WgXcQ' }
    ],
    complementaryMaterials: [
      {
        title: "FONTES E TEMPLATES",
        href: "https://drive.google.com/file/d/1DzEHfvWH7o77UyjTTJdi48PhkK2PtWjI/view?usp=sharing",
        iconName: "FileText",
      }
    ]
  },
  {
    id: 'module4',
    title: 'MÓDULO 04 - Exportação para Redes Sociais',
    description: 'Agora é só exportar seu conteúdo visual no formato certo para Instagram, LinkedIn ou onde quiser postar — pronto para publicar com consistência.',
    Icon: Share2,
    lessons: [
      { title: 'EDITAR E EXPORTAR O CONTEÚDO', youtubeVideoId: 'dQw4w9WgXcQ' }
    ],
    complementaryMaterials: []
  },
  {
    id: 'module5',
    title: 'MÓDULO 05 - Bônus Extras',
    description: 'Desbloqueie dicas e truques exclusivos para turbinar sua criação de conteúdo.',
    Icon: Gift,
    lessons: [
      { title: 'FERRAMENTAS IA GRÁTIS E ÚTEIS', youtubeVideoId: 'dQw4w9WgXcQ' },
      { title: 'PROMPT RAIZ - O CRIADOR DE PROMPTS', youtubeVideoId: 'dQw4w9WgXcQ' }
    ],
    complementaryMaterials: [
      {
        title: "CONHEÇA O PROMPT RAIZ",
        href: "https://pay.kirvano.com/fe159d3f-1d41-4191-a129-9e79603e8392",
        iconName: "FileText",
      }
    ]
  },
];
