import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              Interfeys yuklanishida xatolik
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Kutilmagan texnik nosozlik yuz berdi. Iltimos sahifani qayta yuklang yoki administratorga murojaat qiling.
            </p>
            {this.state.error?.message && (
              <pre className="text-[11px] font-mono bg-slate-100 text-slate-700 p-3 rounded-lg overflow-x-auto text-left mb-6 border border-slate-200">
                {this.state.error.message}
              </pre>
            )}
            <Button onClick={this.handleReload} className="w-full gap-2">
              <RefreshCcw className="w-4 h-4" />
              Sahifani Qayta Yuklash
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

