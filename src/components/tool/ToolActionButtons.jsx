
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';

    export function ToolActionButtons({
      isConverting = false,
      selectedFile,
      onConvert,
      buttonText,
      processingText = "Processing...",
      Icon,
      ProcessingIcon,
      variant = "primary" 
    }) {
      const isDisabled = (variant === "primary" || variant === "primaryDark" || variant === "primaryLight") ? (!selectedFile || isConverting) : isConverting;

      let buttonClass = "w-full text-base md:text-lg py-3 md:py-4 px-6 font-semibold rounded-lg shadow-md transform transition-all duration-150 ease-in-out hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md";

      if (variant === "primaryLight") {
        buttonClass += " bg-green-500 hover:bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-300";
      } else if (variant === "successLight") {
        buttonClass += " bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-300";
      } else if (variant === "primaryDark") {
        buttonClass += " bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-400";
      } else if (variant === "successDark") {
         buttonClass += " bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:outline-none focus:ring-4 focus:ring-emerald-400";
      } else { 
        buttonClass += " bg-primary text-primary-foreground hover:bg-primary/90";
      }


      return (
        <Button 
          onClick={onConvert} 
          disabled={isDisabled}
          size="lg"
          className={buttonClass}
        >
          {isConverting && ProcessingIcon ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mr-2 inline-block"
              >
                <ProcessingIcon className="h-5 w-5" />
              </motion.div>
              {processingText}
            </>
          ) : (
            Icon && (
              <>
                <Icon className="mr-2 h-5 w-5 inline-block" />
                {buttonText}
              </>
            )
          )}
        </Button>
      );
    }
  