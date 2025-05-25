
    import React, { useState, useCallback, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast.js';
    import { allToolsData } from '@/lib/toolsData.jsx';
    import { NotFoundPage } from '@/pages/NotFoundPage';
    import { createConvertedFileBlob } from '@/lib/toolProcessing.js';
    import { 
      downloadBlob,
      handleFileSelect,
      handleFileDrop,
      MAX_FILE_SIZE_MB
    } from '@/lib/fileUtils.js';
    import { useToolDetails } from '@/hooks/useToolDetails.js';
    import { useToolOptionsState } from '@/hooks/useToolOptionsState.js';
    import { useFFmpegInitializer } from '@/hooks/useFFmpegInitializer.js';
    import { ToolPageHeader } from '@/components/tool/ToolPageHeader.jsx';
    import { FileUploadArea } from '@/components/tool/FileUploadArea.jsx';
    import { ConversionResultArea } from '@/components/tool/ConversionResultArea.jsx';
    import { ToolActionButtons } from '@/components/tool/ToolActionButtons.jsx';
    import { ToolProcessingLayout } from '@/components/tool/ToolProcessingLayout.jsx';
    import { ToolOptions } from '@/components/tool/ToolOptions.jsx';
    import { VideoToolOptions } from '@/components/tool/VideoToolOptions.jsx';
    import { ToolInfoDisplay } from '@/components/tool/ToolInfoDisplay.jsx';
    import { FFmpegProgressDisplay } from '@/components/tool/FFmpegProgressDisplay.jsx';
    import { UploadCloud, Settings, FileWarning, Loader2, Film } from 'lucide-react';
    import { motion } from 'framer-motion';

    export function ToolDetailPage() {
      const { toast } = useToast();
      const toolDetails = useToolDetails();
      const { 
        categoryId, toolId, navigate, category, tool, toolDisplayName,
        isImageTool, isVideoTool, isImageConverter, isImageCompressor, 
        isImageBase64Tool, isSimpleImageTool, isVideoBase64Tool, requiresFFmpeg
      } = toolDetails;

      const {
        outputFormat, setOutputFormat, compressionQuality, 
        setCompressionQuality, videoToolOptions, handleVideoOptionChange
      } = useToolOptionsState(toolId, isImageConverter, isImageCompressor, isSimpleImageTool, isImageBase64Tool, isVideoBase64Tool);
      
      const {
        ffmpegRef, isFFmpegLoading, ffmpegLoaded, ffmpegProgress, 
        ffmpegError, initializeFFmpeg, resetFFmpegProgress
      } = useFFmpegInitializer(requiresFFmpeg);

      const [selectedFile, setSelectedFile] = useState(null);
      const [isConverting, setIsConverting] = useState(false);
      const [conversionResult, setConversionResult] = useState(null); 
      const [pageError, setPageError] = useState(null);
      const [isDragOver, setIsDragOver] = useState(false);
      
      useEffect(() => {
        if (Object.keys(allToolsData).length === 0 && !category && !tool) {
           toast({ title: "No Tools Available", description: "Redirecting to homepage.", variant: "destructive", duration: 5000 });
          navigate('/');
        } else if (!category || !tool) {
          toast({ title: "Tool Not Found", description: `Tool ${toolId} in ${categoryId} not found. Redirecting.`, variant: "destructive", duration: 5000 });
          navigate('/');
        }
      }, [categoryId, toolId, category, tool, navigate, toast]);
      
      useEffect(() => {
        if (ffmpegError) {
          setPageError(ffmpegError);
        }
      }, [ffmpegError]);

      const resetConversionState = useCallback(() => {
        setConversionResult(null);
        setPageError(null);
        resetFFmpegProgress();
      }, [resetFFmpegProgress]);

      const onFileSelected = useCallback((file) => {
        setSelectedFile(file);
        resetConversionState();
        if (requiresFFmpeg && !ffmpegLoaded && !isFFmpegLoading) {
          initializeFFmpeg();
        }
      }, [resetConversionState, requiresFFmpeg, ffmpegLoaded, isFFmpegLoading, initializeFFmpeg]);

      const onFileError = useCallback((errorMessage) => {
        setPageError(errorMessage);
        setSelectedFile(null);
        toast({ title: 'File Error', description: errorMessage, variant: 'destructive', duration: 4000 });
      }, [toast]);
      
      const onDownload = useCallback((fileToDownload) => {
        if (fileToDownload && fileToDownload.blob && fileToDownload.name) {
            downloadBlob({ blob: fileToDownload.blob, name: fileToDownload.name });
        } else if (conversionResult && conversionResult.blob && conversionResult.name) {
            downloadBlob({ blob: conversionResult.blob, name: conversionResult.name });
        } else {
           toast({ title: 'Download Error', description: 'No file to download.', variant: 'destructive', duration: 3000 });
        }
      }, [conversionResult, toast]);
      
      const onDownloadFromToast = useCallback((resultToDownload) => {
         if (resultToDownload && resultToDownload.blob && resultToDownload.name) {
            downloadBlob({ blob: resultToDownload.blob, name: resultToDownload.name });
        } else {
           toast({ title: 'Download Error', description: 'Cannot download from toast.', variant: 'destructive', duration: 3000 });
        }
      }, [toast]);

      const handleConversion = useCallback(async () => {
        if (!selectedFile) {
          toast({ title: 'No file selected', description: 'Please select a file.', variant: 'destructive', duration: 3000 });
          return;
        }
        if (requiresFFmpeg && (!ffmpegLoaded || !ffmpegRef.current)) {
          toast({ title: 'Video Engine Not Ready', description: 'Please wait for FFmpeg to load or try refreshing.', variant: 'destructive', duration: 4000 });
          if (!isFFmpegLoading) initializeFFmpeg();
          return;
        }

        setIsConverting(true);
        setPageError(null);
        setConversionResult(null);
        resetFFmpegProgress();

        try {
          const processOptions = {
            outputFormat: isImageConverter ? outputFormat : (isImageBase64Tool || isVideoBase64Tool ? 'txt' : 'png'), 
            quality: isImageCompressor ? compressionQuality / 100 : (isImageConverter && outputFormat === 'jpeg' ? 0.9 : undefined),
            videoOptions: isVideoTool ? videoToolOptions : {}
          };
          
          const result = await createConvertedFileBlob(selectedFile, toolId, categoryId, ffmpegRef.current, processOptions);

          if (!result || (!result.blob && !result.base64String) || !result.name) throw new Error("Processing failed: No valid result.");
          
          setConversionResult(result);
          localStorage.setItem(`converted_${result.name}`, JSON.stringify({
            original: selectedFile.name, convertedName: result.name, convertedType: result.type,
            convertedSize: result.size, timestamp: new Date().toISOString(), tool: toolId, category: categoryId, options: processOptions
          }));

          toast({
            title: 'Processing Successful!',
            description: (
              <>
                {selectedFile.name} processed to {result.name}.<br/>
                {result.blob && (
                  <button type="button" className="text-blue-600 hover:text-blue-800 underline font-medium text-sm p-0 h-auto"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDownloadFromToast(result); }}>
                    Download now
                  </button>
                )}
              </>
            ),
            variant: 'default', duration: (isImageBase64Tool || isVideoBase64Tool) ? 8000 : 5000,
          });
        } catch (e) {
          console.error("Conversion error:", e);
          const errorMessage = e.message || 'Processing failed. Please check the file or try again.';
          setPageError(errorMessage);
          setConversionResult(null);
          toast({ title: 'Processing Error', description: errorMessage, variant: 'destructive', duration: 4000 });
        } finally {
          setIsConverting(false);
        }
      }, [
          selectedFile, toolId, categoryId, toast, onDownloadFromToast, outputFormat, compressionQuality, 
          isImageConverter, isImageCompressor, isImageBase64Tool, isVideoBase64Tool, isVideoTool, 
          requiresFFmpeg, ffmpegLoaded, videoToolOptions, initializeFFmpeg, isFFmpegLoading, resetFFmpegProgress, ffmpegRef
        ]);
      
      const clearSelection = () => {
        setSelectedFile(null);
        resetConversionState();
      };
      
      if (!category || !tool) {
        if (Object.keys(allToolsData).length === 0 && !category && !tool) return <NotFoundPage message="All tools removed." />;
        return <NotFoundPage message={`Tool "${toolId}" in "${categoryId}" not found.`} />;
      }
      
      let actionButtonText = tool.name || "Start Process";
      let ActionButtonIcon = tool.icon || (isVideoTool ? Film : UploadCloud);

      const fileUploadSection = (
        <>
          <FileUploadArea 
            selectedFile={selectedFile} isDragOver={isDragOver}
            onFileChange={(e) => handleFileSelect(e, onFileSelected, onFileError)}
            onDrop={(e) => handleFileDrop(e, onFileSelected, onFileError, setIsDragOver)}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
            onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
            onClearSelection={clearSelection}
            fileTypePrompt={isImageTool ? 'Select image file' : (isVideoTool ? 'Select video file' : 'Select file')}
            maxFileSizeMB={MAX_FILE_SIZE_MB}
            accept={isImageTool ? "image/*" : (isVideoTool ? "video/*" : undefined)}
          />

          {isImageTool && (
            <ToolOptions
              toolId={toolId} categoryId={categoryId} selectedFile={selectedFile}
              outputFormat={outputFormat} onOutputFormatChange={setOutputFormat}
              compressionQuality={compressionQuality} onCompressionQualityChange={setCompressionQuality}
              isConverting={isConverting}
            />
          )}
          {isVideoTool && !isVideoBase64Tool && selectedFile && (
             <VideoToolOptions
              toolId={toolId}
              options={videoToolOptions}
              onOptionChange={handleVideoOptionChange}
              isConverting={isConverting}
            />
          )}

          {pageError && !selectedFile && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-3 rounded-md bg-red-100 text-red-700 text-sm flex items-center">
                <FileWarning className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{pageError}</span>
              </motion.div>
          )}
        </>
      );
      
      const conversionResultSection = (
        <>
          <FFmpegProgressDisplay 
            isFFmpegLoading={isFFmpegLoading} 
            isConverting={isConverting} 
            requiresFFmpeg={requiresFFmpeg} 
            ffmpegProgress={ffmpegProgress} 
          />
          <ToolActionButtons
            isConverting={isConverting || (requiresFFmpeg && isFFmpegLoading)}
            selectedFile={selectedFile}
            onConvert={handleConversion}
            buttonText={actionButtonText}
            processingText={requiresFFmpeg && isFFmpegLoading ? "Loading Engine..." : "Processing..."}
            Icon={ActionButtonIcon}
            ProcessingIcon={requiresFFmpeg && isFFmpegLoading ? Loader2 : Settings}
            variant="primaryLight"
          />
          <div className="mt-6 w-full max-w-md">
            <ConversionResultArea
              error={pageError && selectedFile && !conversionResult ? pageError : null}
              convertedFile={conversionResult}
              selectedFile={selectedFile}
              handleDownload={onDownload}
              isBase64Tool={isImageBase64Tool || isVideoBase64Tool}
              toolId={toolId}
              categoryId={categoryId}
            />
          </div>
        </>
      );

      return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl text-center">
            <ToolPageHeader title={toolDisplayName} />
            <ToolProcessingLayout fileUploadSection={fileUploadSection} conversionResultSection={conversionResultSection} />
             {!selectedFile && !conversionResult && !pageError && (
              <ToolInfoDisplay 
                tool={tool} 
                isImageConverter={isImageConverter} 
                requiresFFmpeg={requiresFFmpeg} 
                ffmpegLoaded={ffmpegLoaded} 
                isFFmpegLoading={isFFmpegLoading} 
              />
            )}
          </motion.div>
        </div>
      );
    }
  