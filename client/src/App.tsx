import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

<<<<<<< HEAD
import { LandingPage } from "@/pages/LandingPage";
=======
import { DashboardOverview } from "@/pages/DashboardOverview";
>>>>>>> 2088e20 (Initial commit)

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
<<<<<<< HEAD
      <Route path="/" component={LandingPage} />
=======
      <Route path="/" component={DashboardOverview} />
>>>>>>> 2088e20 (Initial commit)
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
