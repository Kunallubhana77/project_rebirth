import Navbar from './components/Navbar';
import ProjectRebirth from './components/ProjectRebirth';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="app" style={{ position: 'relative' }}>
      <ErrorBoundary>
        <Navbar />
        <main style={{ margin: 0, padding: 0 }}>
          <ProjectRebirth />
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;
