import React from 'react';
import ToolResultPage from './ToolResultPage';

const DownloadPageLayout = ({
  pageTitle,
  metaDescription,
  toolName,
  toolIcon,
  processedFileName,
  fileDescription,
  filePreview,
  onDownload,
  downloadButtonText = "Download File",
  onGoBack,
  goBackPath,
  additionalInfo,
  toolCategory,
  currentToolPath,
  showRelatedTools = true,
  showTryAgain = true,
  customSuccessMessage,
  fileSize,
  processingTime,
  qualityInfo,
  actionButtons
}) => {
  return (
    <ToolResultPage
      pageTitle={pageTitle}
      metaDescription={metaDescription}
      toolName={toolName}
      toolIcon={toolIcon}
      processedFileName={processedFileName}
      fileDescription={fileDescription}
      filePreview={filePreview}
      onDownload={onDownload}
      downloadButtonText={downloadButtonText}
      onGoBack={onGoBack}
      goBackPath={goBackPath}
      additionalInfo={additionalInfo}
      toolCategory={toolCategory}
      currentToolPath={currentToolPath}
      showRelatedTools={showRelatedTools}
      showTryAgain={showTryAgain}
      customSuccessMessage={customSuccessMessage}
      fileSize={fileSize}
      processingTime={processingTime}
      qualityInfo={qualityInfo}
      actionButtons={actionButtons}
    />
  );
};

export default DownloadPageLayout;