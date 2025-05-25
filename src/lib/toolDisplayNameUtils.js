
    import { allToolsData } from '@/lib/toolsData.jsx';

    export const getToolDisplayName = (toolId, categoryId) => {
      if (!toolId) return "Unknown Tool";

      const category = allToolsData[categoryId];
      const tool = category?.tools.find(t => t.id === toolId);
      if (tool?.name) return tool.name;
      
      if (toolId.startsWith('to-')) {
        return `Convert to ${toolId.substring(3).toUpperCase()}`;
      }
      if (toolId.startsWith('for-')) {
        return `Optimize for ${toolId.substring(4).charAt(0).toUpperCase() + toolId.substring(5)}`;
      }
      if (toolId.startsWith('gen-')) {
        return `${toolId.substring(4).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Generator`;
      }
      return toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
  