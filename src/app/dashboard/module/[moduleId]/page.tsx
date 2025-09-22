import { modules, type ModuleWithContent } from '@/app/dashboard/modules';
import ModuleContent from '@/components/dashboard/ModuleContent';

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = modules.find((m) => m.id === params.moduleId) as ModuleWithContent | undefined;

  if (!module) {
    return <div className="text-center">Módulo não encontrado.</div>;
  }

  return <ModuleContent module={module} />;
}
