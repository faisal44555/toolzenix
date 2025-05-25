
    import React from 'react';

    export function ToolProcessingLayout({ fileUploadSection, conversionResultSection }) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex flex-col items-center space-y-6 mb-6">
            {fileUploadSection}
          </div>
          <div className="w-full flex flex-col items-center">
            {conversionResultSection}
          </div>
        </div>
      );
    }
  