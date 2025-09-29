import "./App.scss";
import { AuthProvider } from "./providers/AuthProvider";
import Router from "./router/Router";

function App() {
  console.log("API KEY PRESENT?", !!import.meta.env.VITE_FIREBASE_API_KEY);
  console.log(
    "AUTH DOMAIN PRESENT?",
    !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
  );
  console.log(
    "FIREBASE_SERVICE_ACCOUNT_PETA_KVIZ PRESENT?",
    !!import.meta.env.FIREBASE_SERVICE_ACCOUNT_PETA_KVIZ
  );
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
