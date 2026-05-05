import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          background: '#050505', 
          color: '#ff4d4d',
          fontFamily: 'Outfit',
          textAlign: 'center',
          padding: '20px'
        }}>
          <h1>SYSTEM FAILURE</h1>
          <p>The mission encountered an unexpected error.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#ff4d4d',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
