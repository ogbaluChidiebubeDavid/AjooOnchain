import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

<<<<<<< HEAD
<<<<<<< HEAD
import { LandingPage } from "@/pages/LandingPage";
=======
import { DashboardOverview } from "@/pages/DashboardOverview";
>>>>>>> 2088e20 (Initial commit)
=======
import { DashboardOverview } from "@/pages/DashboardOverview";
import { DashboardAssets } from "@/pages/DashboardAssets";
import { DashboardRotationalSavings } from "@/pages/DashboardRotationalSavings";
import { DashboardYields } from "@/pages/DashboardYields";
>>>>>>> main

function Router() {
  return (
    <Switch>
<<<<<<< HEAD
      {/* Add pages below */}
<<<<<<< HEAD
      <Route path="/" component={LandingPage} />
=======
      <Route path="/" component={DashboardOverview} />
>>>>>>> 2088e20 (Initial commit)
      {/* Fallback to 404 */}
=======
      <Route path="/" component={DashboardOverview} />
      <Route path="/assets" component={DashboardAssets} />
      <Route path="/rotational-savings" component={DashboardRotationalSavings} />
      <Route path="/yields" component={DashboardYields} />
>>>>>>> main
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
