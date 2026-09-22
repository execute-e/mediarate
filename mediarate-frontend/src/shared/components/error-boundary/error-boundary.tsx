import React, { Component, ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKey?: unknown;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.error("ErrorBoundary caught error:", error);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError && error) {
      if (typeof fallback === "function") {
        return fallback(error, this.resetErrorBoundary);
      }
      return (
        fallback ?? (
          <div className="mt-24 flex flex-col items-center justify-center py-12 text-center">
            <h2 className="mb-2 text-xl font-semibold">Произошла ошибка</h2>
            {process.env.NODE_ENV === "development" && (
              <p className="mb-4 text-gray-500">{error.message}</p>
            )}
            <Button onClick={this.resetErrorBoundary}>Попробовать снова</Button>
          </div>
        )
      );
    }

    return children;
  }
}
