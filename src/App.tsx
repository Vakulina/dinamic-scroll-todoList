import { Suspense } from "react";
import "./App.css";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";


import { lazy } from 'react';

const TestPage = lazy(() =>
    import('./modules/TestPage')
);

function App() {
  return (
    <ErrorBoundary>
        <TestPage />
    </ErrorBoundary>
  );
}

export default App;
