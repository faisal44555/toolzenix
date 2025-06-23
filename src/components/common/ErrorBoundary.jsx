import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }
  
  handleReload = () => {
    window.location.reload();
  }

  handleGoHome = () => {
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || "An unknown error occurred.";
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-background text-foreground">
          <div className="text-center bg-card p-8 rounded-lg shadow-xl border border-destructive/20 max-w-lg">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-destructive mb-2">Oops! Something went wrong.</h1>
            <p className="text-muted-foreground mb-4">
              We've encountered an unexpected issue. This could be due to an invalid file or a temporary problem.
            </p>
            <div className="bg-destructive/10 p-3 rounded-md text-sm text-destructive text-left mb-6">
              <strong>Error:</strong> {errorMessage}
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReload} variant="destructive">
                Reload Page
              </Button>
              <Button onClick={this.handleGoHome} variant="outline">
                <Home className="w-4 h-4 mr-2"/>
                Go to Homepage
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-6 text-left text-xs text-muted-foreground bg-muted p-4 rounded-md">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap break-all">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;