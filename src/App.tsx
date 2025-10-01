import { QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import { AuthProvider } from "./providers/AuthProvider";
import Router from "./router/Router";
import { queryClient } from "./queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
