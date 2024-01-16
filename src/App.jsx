// libs
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// pages
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import Details from "./pages/Details";
import News from "./pages/News";
import NewDetails from "./pages/NewDetails";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import BookMarks from "./pages/BookMarks";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import EditorDashboard from "./pages/EditorDashboard";

// UI
import AppLayout from "./ui/AppLayout";
import ManageLayout from "./ui/ManageLayout";
import AuthenticationLayout from "./ui/AuthenticationLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import ScrollToTop from "./ui/ScrollToTop";

// context and api
import { DarkMode } from "./context/DarkModeContext";
import { UserAuthentication } from "./context/UserContext";

// constants
import {
  EDITOR_LEVEL,
  ADMIN_LEVEL,
  USER_LEVEL,
} from "./constants/anyVariables";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1p
    },
  },
});

function App() {
  return (
    <DarkMode>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <UserAuthentication>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="nha-dat-ban" element={<ListingPage />} />
                {/* base on type to filter query data */}
                <Route path="nha-dat-ban/:type" element={<ListingPage />} />
                <Route path="nha-dat-cho-thue" element={<ListingPage />} />
                <Route
                  path="nha-dat-cho-thue/:type"
                  element={<ListingPage />}
                />
                <Route path="du-an" element={<Projects />} />
                <Route path="nha-dat/:land" element={<Details />} />
                <Route path="tin-da-luu" element={<BookMarks />} />
                <Route path="tin-tuc" element={<News />} />
                <Route path="tin-tuc/:title" element={<NewDetails />} />
                <Route path="danh-ba" element={<Contacts />} />
              </Route>

              {/* no layout with this 2 path */}
              <Route element={<AuthenticationLayout />}>
                <Route path="dang-nhap" element={<Login />} />
                <Route path="dang-ky" element={<Register />} />
              </Route>

              {/* require authenticated user */}
              <Route
                element={
                  <ProtectedRoute accessLevel={USER_LEVEL}>
                    <ManageLayout />
                  </ProtectedRoute>
                }
              >
                {/* path for user to write RE post */}
                <Route path="dang-tin" />

                {/* editor path */}
                <Route
                  path="quan-ly-bai-viet"
                  element={
                    <ProtectedRoute accessLevel={EDITOR_LEVEL}>
                      <EditorDashboard />
                    </ProtectedRoute>
                  }
                />
                {/* admin path */}
                {/* if anyone can think out a name cooler, powerful than this */}
                {/* please let me know */}
                <Route
                  path="control"
                  element={
                    <ProtectedRoute accessLevel={ADMIN_LEVEL}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserAuthentication>

        {/* notifications */}
        <Toaster
          position="top-right"
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </QueryClientProvider>
    </DarkMode>
  );
}

export default App;
