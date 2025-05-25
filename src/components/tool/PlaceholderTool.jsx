
    import React from 'react';

    export function PlaceholderTool({ toolId }) {
      const toolDisplayName = toolId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return (
        <div className="mt-6 p-6 border-dashed border-2 border-muted rounded-md min-h-[200px] flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-primary lucide lucide-construct">
              <path d="M12 2 L2 7 L12 12 L22 7 L12 2 Z"></path>
              <path d="M2 17 L12 22 L22 17"></path>
              <path d="M2 12 L12 17 L22 12"></path>
              <line x1="12" y1="22" x2="12" y2="17"></line>
              <line x1="12" y1="12" x2="12" y2="7"></line>
              <line x1="22" y1="12" x2="12" y2="7"></line>
              <line x1="2" y1="12" x2="12" y2="17"></line>
            </svg>
            <p className="text-lg font-semibold text-foreground">Tool Under Construction</p>
            <p className="text-muted-foreground">
              The converter interface for "{toolDisplayName}" is currently being developed.
            </p>
            <p className="text-muted-foreground mt-1">Please check back later!</p>
          </div>
        </div>
      );
    }
  