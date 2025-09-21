
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
    description: 'Use nosso gerador de prompt para criar um fluxo de trabalho prático e eficiente.',
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
    description: 'Gere posts completos para suas redes sociais com o poder da inteligência artificial.',
    Icon: FilePenLine,
    complementaryMaterials: [
        {
            title: "PDF do Módulo",
            href: "https://drive.google.com/file/d/1MBa9AlRKvyhrAXu1xmV_VYcVauxRykOl/view?usp=sharing",
            Icon: FileText
        }
    ]
  },
  {
    id: 'module3',
    title: 'MÓDULO 03 - Aplicação Visual Automática',
    description: 'Transforme seu conteúdo em um design incrível usando nossos templates.',
    Icon: LayoutTemplate,
    complementaryMaterials: []
  },
  {
    id: 'module4',
    title: 'MÓDULO 04 - Exportação para Redes Sociais',
    description: 'Exporte seu conteúdo no formato ideal para Instagram, Facebook, TikTok e mais.',
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
