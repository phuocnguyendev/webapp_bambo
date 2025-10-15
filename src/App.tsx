import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import AppRouter from "./routers";
import ErrorFallback from "@/components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NuqsAdapter>
        <AppRouter />
      </NuqsAdapter>
    </ErrorBoundary>
  );
}

export default App;
