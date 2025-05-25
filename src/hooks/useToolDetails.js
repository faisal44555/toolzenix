
    import React from 'react';
    import { useMemo } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { allToolsData } from '@/lib/toolsData.jsx';
    import { getToolDisplayName } from '@/lib/toolMetaUtils.js';

    export function useToolDetails() {
      const { categoryId, toolId } = useParams();
      const navigate = useNavigate();

      const category = useMemo(() => allToolsData[categoryId], [categoryId]);
      const tool = useMemo(() => category?.tools.find(t => t.id === toolId), [category, toolId]);

      const toolDisplayName = useMemo(() => getToolDisplayName(toolId, categoryId), [toolId, categoryId]);
      
      const isImageTool = useMemo(() => categoryId === 'image', [categoryId]);
      const isVideoTool = useMemo(() => categoryId === 'video', [categoryId]);
      
      const isImageConverter = useMemo(() => ['to-png', 'to-jpg', 'to-jpeg', 'to-webp'].includes(toolId) && isImageTool, [toolId, isImageTool]);
      const isImageCompressor = useMemo(() => toolId === 'compress-image' && isImageTool, [toolId, isImageTool]);
      const isImageBase64Tool = useMemo(() => toolId === 'image-to-base64' && isImageTool, [toolId, isImageTool]);
      const isSimpleImageTool = useMemo(() => ['enhance-image', 'grayscale-image', 'rotate-image', 'flip-image-horizontal', 'flip-image-vertical', 'blur-image', 'brighten-image', 'pixelate-image', 'remove-white-background'].includes(toolId) && isImageTool, [toolId, isImageTool]);

      const isVideoTrimmer = useMemo(() => toolId === 'trim-video' && isVideoTool, [toolId, isVideoTool]);
      const isVideoBase64Tool = useMemo(() => toolId === 'video-to-base64' && isVideoTool, [toolId, isVideoTool]);
      const requiresFFmpeg = useMemo(() => isVideoTool && !isVideoBase64Tool, [isVideoTool, isVideoBase64Tool]);

      return {
        categoryId,
        toolId,
        navigate,
        category,
        tool,
        toolDisplayName,
        isImageTool,
        isVideoTool,
        isImageConverter,
        isImageCompressor,
        isImageBase64Tool,
        isSimpleImageTool,
        isVideoTrimmer,
        isVideoBase64Tool,
        requiresFFmpeg,
      };
    }
  