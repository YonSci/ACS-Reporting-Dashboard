import React from 'react';
import { ChartBarIcon, GlobeAltIcon, BriefcaseIcon } from './icons/MiniIcons';

const visualizationModes = [
  {
    id: 'default',
    name: 'Default',
    icon: GlobeAltIcon,
    description: 'Simple country highlighting'
  },
  {
    id: 'choropleth',
    name: 'Choropleth',
    icon: ChartBarIcon,
    description: 'Color intensity based on intervention count'
  },
  {
    id: 'bubble',
    name: 'Bubble',
    icon: BriefcaseIcon,
    description: 'Circular markers sized by intervention impact'
  }
];

const MapVisualizer = ({ currentMode = 'default', onModeChange = () => {} }) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex gap-2">
        {visualizationModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-all
                ${currentMode === mode.id 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}
              `}
              title={mode.description}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{mode.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MapVisualizer; 