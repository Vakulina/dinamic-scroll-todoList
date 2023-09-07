import "./App.css";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";

import { lazy } from 'react';

const TestPage = lazy(() =>
    import('./modules/TestPage/TestPage')
);

function App() {
  return (
    <ErrorBoundary>
        <TestPage />
    </ErrorBoundary>
  );
}

export default App;
