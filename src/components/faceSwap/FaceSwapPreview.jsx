import React from "react";
import { RotateCcw, Move, RotateCw, Maximize2 } from "lucide-react";

const FaceSwapPreview = ({ 
  backgroundPreview, 
  overlayPreview, 
  overlayTransform, 
  containerRef, 
  overlayRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  isDragging,
  isResizing,
  isRotating
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h3>
      
      <div 
        ref={containerRef}
        className="relative w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background Image */}
        {backgroundPreview && (
          <img 
            src={backgroundPreview} 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        )}

        {/* Overlay Image */}
        {overlayPreview && backgroundPreview && (
          <div
            ref={overlayRef}
            className="absolute cursor-move select-none"
            style={{
              left: `${overlayTransform.x}%`,
              top: `${overlayTransform.y}%`,
              transform: `translate(-50%, -50%) scale(${overlayTransform.scale}) rotate(${overlayTransform.rotation}deg)`,
              transformOrigin: 'center',
              zIndex: 10
            }}
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          >
            <img 
              src={overlayPreview} 
              alt="Overlay Face" 
              className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-lg"
              draggable={false}
            />
            
            {/* Control Handles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                 onMouseDown={(e) => handleMouseDown(e, 'resize')}
                 title="Resize">
              <Maximize2 className="w-3 h-3 text-white" />
            </div>
            
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full cursor-pointer shadow-md hover:bg-green-600 transition-colors flex items-center justify-center"
                 onMouseDown={(e) => handleMouseDown(e, 'rotate')}
                 title="Rotate">
              <RotateCw className="w-3 h-3 text-white" />
            </div>
            
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-purple-500 rounded-full cursor-move shadow-md hover:bg-purple-600 transition-colors flex items-center justify-center"
                 title="Drag">
              <Move className="w-3 h-3 text-white" />
            </div>
          </div>
        )}

        {/* Instructions */}
        {!backgroundPreview && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Upload background image to see preview
            </p>
          </div>
        )}

        {backgroundPreview && !overlayPreview && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white text-center">
              Upload overlay face to start editing
            </p>
          </div>
        )}
      </div>

      {/* Status Indicators */}
      {(isDragging || isResizing || isRotating) && (
        <div className="flex items-center justify-center space-x-4 text-sm">
          {isDragging && (
            <div className="flex items-center text-purple-600 dark:text-purple-400">
              <Move className="w-4 h-4 mr-1" />
              Dragging
            </div>
          )}
          {isResizing && (
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <Maximize2 className="w-4 h-4 mr-1" />
              Resizing
            </div>
          )}
          {isRotating && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <RotateCw className="w-4 h-4 mr-1" />
              Rotating
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceSwapPreview;