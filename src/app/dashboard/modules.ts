import type { LucideIcon } from 'lucide-react';
import { BrainCircuit, FilePenLine, Gift, LayoutTemplate, Share2 } from 'lucide-react';

export type Module = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export const modules: Module[] = [
  {
    id: 'module1',
    title: 'MÓDULO 01 - Fluxo Prático',
    description: 'Use nosso gerador de prompt para criar um fluxo de trabalho prático e eficiente.',
    Icon: BrainCircuit,
  },
  {
    id: 'module2',
    title: 'Criação de post com IA',
    description: 'Gere posts completos para suas redes sociais com o poder da inteligência artificial.',
    Icon: FilePenLine,
  },
  {
    id: 'module3',
    title: 'Aplicação visual automática com template',
    description: 'Transforme seu conteúdo em um design incrível usando nossos templates.',
    Icon: LayoutTemplate,
  },
  {
    id: 'module4',
    title: 'Exportação pronta para redes sociais',
    description: 'Exporte seu conteúdo no formato ideal para Instagram, Facebook, TikTok e mais.',
    Icon: Share2,
  },
  {
    id: 'module5',
    title: 'Módulo Bônus',
    description: 'Desbloqueie dicas e truques exclusivos para turbinar sua criação de conteúdo.',
    Icon: Gift,
  },
];
