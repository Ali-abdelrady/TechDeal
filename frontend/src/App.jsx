import { SystemInfoProvider } from "./context/SystemInfoContext";
import Router from "./Router";

export default function App() {
  return (
    <div>
      <SystemInfoProvider>
        <Router />
      </SystemInfoProvider>
    </div>
  );
}
