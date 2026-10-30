'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
          <div className="glass-card p-8 rounded-3xl text-center max-w-md w-full border border-slate-800 space-y-4">
            <div className="text-4xl">⚠️</div>
            <h2 className="text-xl font-bold text-white">რაღაც შეიცალა არასწორად</h2>
            <p className="text-slate-400 text-sm">მოულოდნელი შეცდომა მოხდა სისტემაში. გთხოვთ სცადოთ თავიდან.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            >
              თავიდან ცდა (Retry)
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}