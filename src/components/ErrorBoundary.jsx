import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bio-cream flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-3xl shadow-xl border border-bio-navy/10">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto text-3xl">
              ⚠️
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-bio-navy">Algo salió mal</h2>
              <p className="text-sm text-bio-textMuted leading-relaxed">
                Ocurrió un error inesperado en la aplicación. Estamos trabajando para solucionarlo.
                Por favor recarga la página o vuelve al inicio.
              </p>
            </div>
            {this.state.error && (
              <p className="text-[11px] text-red-400 font-mono bg-red-50 p-3 rounded-xl text-left break-all">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={this.handleReload}
              className="px-6 py-3 rounded-xl bg-bio-green text-white font-extrabold text-sm hover:bg-bio-greenDark transition-colors shadow-md"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
