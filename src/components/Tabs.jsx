
import {
  Layers,
  Grid3X3,
  Maximize2,
  MoveUpRight
} from 'lucide-react';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'gauss',
      label: 'Gauss-Jordan',
      icon: Layers
    },
    {
      id: 'det',
      label: 'Determinante',
      icon: Grid3X3
    },
    {
      id: 'ops',
      label: 'Operaciones',
      icon: Maximize2
    },
    {
      id: 'vectors',
      label: 'Vectores',
      icon: MoveUpRight
    }
  ];

  return (
    <div className="flex flex-wrap bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner max-w-3xl mx-auto">

      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex-1 min-w-fit py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === id
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}

    </div>
  );
}
