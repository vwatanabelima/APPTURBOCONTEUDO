
import type { LucideIcon } from 'lucide-react';
import {
  BookUser,
  BrainCircuit,
  LayoutTemplate,
  Share2,
  Brush,
  Code,
  FileText,
  Youtube,
  Star,
  Bot
} from 'lucide-react';

export type Lesson = {
  title: string;
  youtubeVideoId?: string;
};

export type ComplementaryMaterial = {
  title: string;
  href: string;
  iconName: keyof typeof import('lucide-react');
};

export interface Module {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export interface ModuleWithContent extends Module {
  lessons: Lesson[];
  complementaryMaterials: ComplementaryMaterial[];
}


export const modules: (ModuleWithContent)[] = [
  {
    id: 'module1',
    title: 'MÓDULO 01 - Comece por aqui',
    description: 'Boas-vindas ao curso! Aprenda a instalar o Figma e o plugin exclusivo que vamos usar para criar conteúdo em um fluxo de trabalho otimizado e inteligente.',
    Icon: Brush,
    lessons: [
        { title: 'Instalação do Figma Desktop', youtubeVideoId: '-AUnFq0vpMw' },
        { title: 'Instalação do Plugin TURBOCONTEÚDO', youtubeVideoId: 'vJddr8mM4LM' },
    ],
    complementaryMaterials: [
        {
            title: "PLUGIN TURBOCONTEÚDO",
            href: "https://www.figma.com/community/plugin/1344473634037599298/turboconteudo",
            iconName: "FileText"
        }
    ]
  },
  {
    id: 'module2',
    title: 'MÓDULO 02 - Criação de Conteúdo com IA',
    description: 'Aprenda a usar seus novos assistentes de IA para criar o roteiro dos seus carrosséis em poucos minutos — de forma estratégica e otimizada para engajamento.',
    Icon: BrainCircuit,
    lessons: [
      { title: 'PROMPT ATHENA PARA CRIAR CARROSÉIS VIRAIS', youtubeVideoId: '9rrwH-LL6uo' },
      { title: 'PROMPT ESTAGIÁRIA - A ASSISTENTE NA CRIAÇÃO DOS POSTS', youtubeVideoId: 'mzoo6-sE1_A' }
    ],
    complementaryMaterials: [
        {
            title: "ATHENA - A ASSISTENTE DE CRIAÇÃO DE CARROSSÉIS",
            href: "https://drive.google.com/file/d/1MBa9AlRKvyhrAXu1xmV_VYcVauxRykOl/view?usp=sharing",
            iconName: "FileText"
        },
        {
            title: "ESTAGIÁRIA - A ASSISTENTE DE CRIAÇÃO DE POSTS",
            href: "https://drive.google.com/file/d/1Rt6kJxDWCuLqcOhZvu4XwiTWHLiFzk__/view?usp=sharing",
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
      { title: 'INSTALAÇÃO DE TEMPLATE E FONTES', youtubeVideoId: 'kGSwly3qLeA' },
      { title: 'UTILIZAÇÃO DO PLUGIN NO FIGMA', youtubeVideoId: '5AzzFn2uuZk' }
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
      { title: 'EDITAR E EXPORTAR O CONTEÚDO', youtubeVideoId: 'C6ZT-r32oVw' }
    ],
    complementaryMaterials: []
  },
];
