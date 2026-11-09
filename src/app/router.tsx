import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from "@/components/shared/AppLayout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

// Route-based Code Splitting (Lazy Loading)
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const JobsPage = lazy(() =>
  import("@/pages/JobsPage").then((m) => ({ default: m.JobsPage })),
);
const EditJobPage = lazy(() =>
  import("@/pages/EditJobPage").then((m) => ({ default: m.EditJobPage })),
);
const OperationalPage = lazy(() =>
  import("@/pages/OperationalPage").then((m) => ({
    default: m.OperationalPage,
  })),
);
const UsersPage = lazy(() =>
  import("@/pages/UsersPage").then((m) => ({ default: m.UsersPage })),
);
const MasterDataPage = lazy(() =>
  import("@/pages/MasterDataPage").then((m) => ({ default: m.MasterDataPage })),
);
const BillingPage = lazy(() =>
  import("@/pages/BillingPage").then((m) => ({ default: m.BillingPage })),
);

// Loading Fallback saat halaman di-download oleh browser
const PageLoader = () => (
  <div className="w-full h-96 flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-slate-400 font-medium">
      Memuat halaman...
    </span>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute allowedRoles={["admin", "sales"]}>
            <Suspense fallback={<PageLoader />}>
              <JobsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/:id/edit",
        element: (
          <ProtectedRoute allowedRoles={["admin", "sales"]}>
            <Suspense fallback={<PageLoader />}>
              <EditJobPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "operational",
        element: (
          <ProtectedRoute allowedRoles={["admin", "operasional"]}>
            <Suspense fallback={<PageLoader />}>
              <OperationalPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "billing",
        element: (
          <ProtectedRoute allowedRoles={["admin", "finance"]}>
            <Suspense fallback={<PageLoader />}>
              <BillingPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Suspense fallback={<PageLoader />}>
              <UsersPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "master-data",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Suspense fallback={<PageLoader />}>
              <MasterDataPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "master-data/:resource",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Suspense fallback={<PageLoader />}>
              <MasterDataPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
