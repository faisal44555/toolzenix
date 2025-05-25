
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { CheckCircle, XCircle, Download, Hash, UploadCloud, Minimize2, Sparkles, Palette, RotateCcw, FlipHorizontal, EyeOff, Sun, Baseline, Image as ImageIconLucide, Eraser, Film, Scissors, VolumeX, FileAudio, Gift, FileText } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    
    export function ConversionResultArea({ 
      error, 
      convertedFile, 
      selectedFile, 
      handleDownload, 
      isBase64Tool = false,
      toolId,
      categoryId
    }) {
      let successTitle = "Operation Complete!";
      let downloadButtonText = "Download Result";
      let placeholderTitle = "Ready to Process";
      let placeholderText = "Your processed file will appear here once the operation is complete.";
      let PlaceholderIcon = UploadCloud;

      const isImageTool = categoryId === 'image';
      const isVideoTool = categoryId === 'video';

      if (isImageTool) {
        if (toolId === 'compress-image') {
          successTitle = "Compression Complete!"; downloadButtonText = "Download Compressed Image"; placeholderTitle = "Ready to Compress"; PlaceholderIcon = Minimize2;
        } else if (toolId === 'enhance-image') {
          successTitle = "Enhancement Complete!"; downloadButtonText = "Download Enhanced Image"; placeholderTitle = "Ready to Enhance"; PlaceholderIcon = Sparkles;
        } else if (toolId === 'image-to-base64') {
          successTitle = "Base64 Conversion Complete!"; downloadButtonText = "Download Base64 Text"; placeholderTitle = "Ready to Convert to Base64"; PlaceholderIcon = Baseline;
        } else if (toolId === 'grayscale-image') {
          successTitle = "Grayscale Applied!"; downloadButtonText = "Download Grayscale Image"; placeholderTitle = "Ready for Grayscale"; PlaceholderIcon = Palette;
        } else if (toolId === 'rotate-image') {
          successTitle = "Rotation Applied!"; downloadButtonText = "Download Rotated Image"; placeholderTitle = "Ready to Rotate"; PlaceholderIcon = RotateCcw;
        } else if (toolId === 'flip-image-horizontal' || toolId === 'flip-image-vertical') {
          successTitle = "Flip Applied!"; downloadButtonText = "Download Flipped Image"; placeholderTitle = "Ready to Flip"; PlaceholderIcon = FlipHorizontal;
        } else if (toolId === 'blur-image') {
          successTitle = "Blur Applied!"; downloadButtonText = "Download Blurred Image"; placeholderTitle = "Ready to Blur"; PlaceholderIcon = EyeOff;
        } else if (toolId === 'brighten-image') {
          successTitle = "Brightness Applied!"; downloadButtonText = "Download Brightened Image"; placeholderTitle = "Ready to Brighten"; PlaceholderIcon = Sun;
        } else if (toolId === 'pixelate-image') {
          successTitle = "Pixelation Applied!"; downloadButtonText = "Download Pixelated Image"; placeholderTitle = "Ready to Pixelate"; PlaceholderIcon = ImageIconLucide;
        } else if (toolId === 'remove-white-background') {
          successTitle = "Background Removed!"; downloadButtonText = "Download Image (PNG)"; placeholderTitle = "Ready to Remove Background"; PlaceholderIcon = Eraser;
        } else {
           successTitle = "Conversion Complete!"; downloadButtonText = "Download Converted File";
        }
      } else if (isVideoTool) {
        if (toolId === 'trim-video') {
          successTitle = "Video Trimmed!"; downloadButtonText = "Download Trimmed Video"; placeholderTitle = "Ready to Trim Video"; PlaceholderIcon = Scissors;
        } else if (toolId === 'mute-video') {
          successTitle = "Video Muted!"; downloadButtonText = "Download Muted Video"; placeholderTitle = "Ready to Mute Video"; PlaceholderIcon = VolumeX;
        } else if (toolId === 'extract-audio') {
          successTitle = "Audio Extracted!"; downloadButtonText = "Download Audio (MP3)"; placeholderTitle = "Ready to Extract Audio"; PlaceholderIcon = FileAudio;
        } else if (toolId === 'compress-video') {
          successTitle = "Video Compressed!"; downloadButtonText = "Download Compressed Video"; placeholderTitle = "Ready to Compress Video"; PlaceholderIcon = Minimize2;
        } else if (toolId === 'video-to-gif') {
          successTitle = "GIF Created!"; downloadButtonText = "Download GIF"; placeholderTitle = "Ready to Create GIF"; PlaceholderIcon = Gift;
        } else if (toolId === 'video-to-base64') {
          successTitle = "Base64 Conversion Complete!"; downloadButtonText = "Download Base64 Text"; placeholderTitle = "Ready to Convert Video to Base64"; PlaceholderIcon = FileText;
        } else {
          successTitle = "Video Processed!"; downloadButtonText = "Download Video"; placeholderTitle = "Ready to Process Video"; PlaceholderIcon = Film;
        }
      }


      return (
        <AnimatePresence mode="wait">
          {error && !convertedFile && ( 
            <motion.div
              key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="w-full max-w-md p-6 rounded-xl bg-red-100 text-red-700 text-center">
              <XCircle className="h-12 w-12 mx-auto mb-3 text-red-500" />
              <h3 className="text-xl font-semibold mb-2">Processing Failed</h3>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {convertedFile && selectedFile && (
            <motion.div
              key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-md p-6 md:p-8 rounded-xl bg-green-50 border border-green-200 text-center shadow-lg">
              <CheckCircle className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 text-green-500" />
              <h3 className="text-xl md:text-2xl font-semibold text-green-700 mb-1 md:mb-2">{successTitle}</h3>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Original: <span className="font-medium text-slate-800">{selectedFile.name}</span> ({(selectedFile.size / 1024).toFixed(2)} KB)</p>
              
              {isBase64Tool && convertedFile.base64String ? (
                <>
                  <p className="text-xs md:text-sm text-slate-600 mb-2">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> (Base64 Text)</p>
                  <Textarea value={convertedFile.base64String} readOnly className="w-full h-32 md:h-40 my-2 text-xs bg-slate-50 border-slate-300" onClick={(e) => e.target.select()} />
                  <p className="text-xs text-slate-500 mb-3">Click the text area to select all, then copy.</p>
                </>
              ) : convertedFile.type?.startsWith('video/') ? (
                 <>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> ({(convertedFile.size / 1024).toFixed(2)} KB)</p>
                  <video src={URL.createObjectURL(convertedFile.blob)} controls className="w-full rounded-lg my-2 max-h-60"></video>
                 </>
              ) : convertedFile.type?.startsWith('audio/') ? (
                 <>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> ({(convertedFile.size / 1024).toFixed(2)} KB)</p>
                  <audio src={URL.createObjectURL(convertedFile.blob)} controls className="w-full my-2"></audio>
                 </>
              ) : convertedFile.type === 'image/gif' ? (
                 <>
                  <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> ({(convertedFile.size / 1024).toFixed(2)} KB)</p>
                  <img-replace src={URL.createObjectURL(convertedFile.blob)} alt="Generated GIF" className="w-full rounded-lg my-2 max-h-60 object-contain" />
                 </>
              ) : (
                <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> ({(convertedFile.size / 1024).toFixed(2)} KB)</p>
              )}

              {(toolId === 'compress-image' || toolId === 'compress-video') && selectedFile.size > 0 && convertedFile.size > 0 && !isBase64Tool && (
                <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4 font-semibold">
                  Reduction: <span className="text-green-600">{((1 - convertedFile.size / selectedFile.size) * 100).toFixed(1)}%</span>
                </p>
              )}
              {convertedFile.blob && (
                <Button onClick={() => handleDownload(convertedFile)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-base transition-colors duration-150 ease-in-out">
                  <Download className="mr-2 h-5 w-5 inline-block" />
                  {downloadButtonText}
                </Button>
              )}
            </motion.div>
          )}

          {!error && !convertedFile && (
             <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center text-slate-500 p-4">
                <PlaceholderIcon className="mx-auto mb-4 h-20 w-20 md:h-24 md:w-24 opacity-30" />
                <h3 className="text-lg md:text-xl font-semibold text-slate-600 mb-2">{placeholderTitle}</h3>
                <p className="text-xs md:text-sm">{placeholderText}</p>
             </motion.div>
          )}
        </AnimatePresence>
      );
    }
  