import { modules, type ModuleWithContent } from '@/app/dashboard/modules';
import ModuleContent from '@/components/dashboard/ModuleContent';
import { notFound } from 'next/navigation';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId) as ModuleWithContent | undefined;

  if (!module) {
    notFound();
  }

  // Desestruturamos o objeto para não passar o componente Icon
  const { Icon, ...moduleProps } = module;

  return <ModuleContent {...moduleProps} />;
}
