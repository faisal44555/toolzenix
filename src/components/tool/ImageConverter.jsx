
    import React, { useState, useRef, useCallback } from 'react';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import { Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
    import { FileInputArea } from '@/components/tool/FileInputArea';
    import { ImagePreview } from '@/components/tool/ImagePreview';
    import { ConversionOptions } from '@/components/tool/ConversionOptions';
    import { ConvertedImageDisplay } from '@/components/tool/ConvertedImageDisplay';
    import { convertImage, getOutputExtension } from '@/lib/imageConverter.jsx';

    export function ImageConverter({ toolId }) {
      const { toast } = useToast();
      
      const [selectedFile, setSelectedFile] = useState(null);
      const [originalImagePreview, setOriginalImagePreview] = useState(null);
      const [convertedImage, setConvertedImage] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [webpQuality, setWebpQuality] = useState([0.9]); 
      const fileInputRef = useRef(null);

      const resetState = useCallback(() => {
        setSelectedFile(null);
        setOriginalImagePreview(null);
        setConvertedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, []);

      const handleFileChange = (event) => {
        resetState();
        const file = event.target.files[0];
        if (file) {
          let isValid = false;
          let expectedTypeMsg = "";

          if (toolId === 'jpg-to-png') {
            isValid = ['image/jpeg', 'image/jpg'].includes(file.type);
            expectedTypeMsg = "Please upload a JPG or JPEG file.";
          } else if (toolId === 'png-to-webp') {
            isValid = file.type === 'image/png';
            expectedTypeMsg = "Please upload a PNG file.";
          } else {
             toast({ variant: "destructive", title: "Unsupported Tool", description: "This tool is not configured correctly for image conversion."});
             return;
          }

          if (!isValid) {
            toast({ variant: "destructive", title: "Invalid File Type", description: expectedTypeMsg });
            setSelectedFile(null);
            setOriginalImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
          }
          
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onloadend = () => setOriginalImagePreview(reader.result);
          reader.onerror = () => {
            toast({ variant: "destructive", title: "File Read Error", description: "Could not read the selected file." });
            resetState();
          };
          reader.readAsDataURL(file);
        }
      };

      const handleConvert = async () => {
        if (!selectedFile) {
          toast({ variant: "destructive", title: "No File Selected", description: "Please select a file to convert." });
          return;
        }
        setIsLoading(true);
        setConvertedImage(null);

        try {
          const { outputDataUrl, successMsg } = await convertImage(selectedFile, toolId, webpQuality[0]);
          setConvertedImage(outputDataUrl);
          toast({ icon: <CheckCircle className="h-5 w-5 text-green-500" />, title: "Conversion Successful!", description: successMsg });
        } catch (error) {
          toast({ variant: "destructive", title: error.title || "Conversion Error", description: error.message || "An unknown error occurred during conversion." });
        } finally {
          setIsLoading(false);
        }
      };

      const handleDownload = () => {
        if (!convertedImage || !selectedFile) return;
        const link = document.createElement('a');
        link.href = convertedImage;
        
        const baseName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.') || selectedFile.name.length);
        const extension = getOutputExtension(toolId);
        
        link.download = `${baseName}${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Download Started", description: `Downloading ${link.download}`});
      };
      
      const triggerFileInput = () => fileInputRef.current?.click();

      let title = "Upload Image";
      let acceptedTypes = "image/*";
      let specificText = "image files";
      let convertButtonText = "Convert";
      let convertButtonVariant = "default";

      if (toolId === 'jpg-to-png') {
        title = "Upload JPG Image";
        acceptedTypes = "image/jpeg,image/jpg";
        specificText = "JPG or JPEG files only";
        convertButtonText = "Convert to PNG";
      } else if (toolId === 'png-to-webp') {
        title = "Upload PNG Image";
        acceptedTypes = "image/png";
        specificText = "PNG files only";
        convertButtonText = "Convert to WebP";
        convertButtonVariant = "accent";
      }

      return (
        <div className="space-y-6">
          <FileInputArea 
            title={title}
            specificText={specificText}
            acceptedTypes={acceptedTypes}
            handleFileChange={handleFileChange}
            triggerFileInput={triggerFileInput}
            fileInputRef={fileInputRef}
            selectedFile={selectedFile}
          />
          
          <ImagePreview src={originalImagePreview} alt="Original image preview" title="Original Image Preview:" />

          <ConversionOptions 
            toolId={toolId}
            webpQuality={webpQuality}
            setWebpQuality={setWebpQuality}
            isLoading={isLoading}
            selectedFile={selectedFile}
          />

          <Button 
            onClick={handleConvert} 
            disabled={isLoading || !selectedFile} 
            variant={convertButtonVariant}
            className="w-full sm:w-auto"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
            {convertButtonText}
          </Button>

          <ConvertedImageDisplay 
            convertedImage={convertedImage}
            handleDownload={handleDownload}
          />
        </div>
      );
    }
  