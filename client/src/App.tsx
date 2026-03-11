import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider } from "@/lib/Web3Context";
import NotFound from "@/pages/not-found";

import { LandingPage } from "@/pages/LandingPage";
import { DashboardOverview } from "@/pages/dashboard/DashboardOverview";
import { DashboardAssets } from "@/pages/dashboard/DashboardAssets";
import { DashboardRotationalSavings } from "@/pages/dashboard/DashboardRotationalSavings";
import { DashboardYields } from "@/pages/dashboard/DashboardYields";
import { GroupDetails } from "@/pages/dashboard/GroupDetails";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={DashboardOverview} />
      <Route path="/dashboard/circle/:id" component={GroupDetails} />
      <Route path="/dashboard/assets" component={DashboardAssets} />
      <Route path="/dashboard/rotational-savings" component={DashboardRotationalSavings} />
      <Route path="/dashboard/yields" component={DashboardYields} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}

export default App;
