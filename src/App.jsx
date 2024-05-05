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
import Contacts from "./pages/Contacts";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import EditorDashboard from "./pages/EditorDashboard";
import AccountManagement from "./pages/AccountManagement";
import User from "./pages/User";

// UI
import AppLayout from "./ui/AppLayout";
import ManageLayout from "./ui/ManageLayout";
import AuthenticationLayout from "./ui/AuthenticationLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Unauthorized from "./ui/Unauthorized";
import ScrollToTop from "./ui/ScrollToTop";
import UserDashboard from "./pages/UserDashboard";
import LoginMagicLink from "./features/auth/LoginMagicLink";
import CheckEmailPlease from "./features/auth/CheckEmailPlease";
import EmailVerification from "./features/auth/EmailVerification";

// context api
import { DarkMode } from "./context/DarkModeContext";
import { UserAuthentication } from "./context/UserContext";
import { MapView } from "./context/MapViewContext";

// components lib
import { theme } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

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
    <ChakraProvider theme={theme}>
      <DarkMode>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <UserAuthentication>
            <MapView>
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
                    <Route path="nha-dat/:land" element={<Details />} />
                    <Route path="tin-da-luu" element={<Bookmarks />} />
                    <Route path="tin-tuc" element={<News />} />
                    <Route path="tin-tuc/:title" element={<NewDetails />} />
                    <Route path="danh-ba" element={<Contacts />} />
                    <Route path="danh-ba/nguoi-dung/:name" element={<User />} />
                  </Route>

                  {/* no layout with these path */}
                  <Route element={<AuthenticationLayout />}>
                    <Route path="dang-nhap" element={<Login />} />
                    <Route path="dang-ky" element={<Register />} />
                    <Route path="quen-mat-khau" element={<LoginMagicLink />} />
                    {/* require email verification */}
                    <Route
                      path="xac-thuc-email"
                      element={<EmailVerification />}
                    />
                    {/* display after email registeration */}
                    <Route
                      element={<CheckEmailPlease />}
                      path="kiem-tra-email"
                    />
                  </Route>

                  {/* user account management */}
                  <Route
                    element={
                      <ProtectedRoute accessLevel={USER_LEVEL} accSettings>
                        <ManageLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="tai-khoan" element={<AccountManagement />} />
                  </Route>

                  {/* require authenticated user */}
                  <Route
                    element={
                      <ProtectedRoute accessLevel={USER_LEVEL}>
                        <ManageLayout />
                      </ProtectedRoute>
                    }
                  >
                    {/* path for user to write & manage RE post */}
                    <Route path="dang-tin" element={<UserDashboard form />} />
                    <Route
                      path="quan-ly-bai-viet"
                      element={<UserDashboard />}
                    />
                    <Route
                      path="quan-ly-bai-viet/:title"
                      element={<UserDashboard form />}
                    />

                    {/* editor path */}
                    <Route
                      path="quan-ly-tin-tuc"
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
                    <Route
                      path="role-management"
                      element={
                        <ProtectedRoute accessLevel={ADMIN_LEVEL}>
                          <AdminPanel />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* 404 & unauthorized */}
                  <Route path="khong-co-quyen" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </MapView>
          </UserAuthentication>

          {/* notifications */}
          <Toaster
            containerClassName="m-2 md:m-3"
            toastOptions={{
              // position: "top-right",
              style: { padding: "16px 24px" },
              className:
                "md:font-base max-w-[500px] bg-light dark:bg-dark text-black dark:text-white shadow-sm shadow-dark/80 dark:shadow-light/80",
              success: {
                duration: 4000,
              },
              error: {
                duration: 4000,
              },
            }}
          />
        </QueryClientProvider>
      </DarkMode>
    </ChakraProvider>
  );
}

export default App;
