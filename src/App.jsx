import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import Details from "./pages/Details";
import News from "./pages/News";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AppLayout from "./ui/AppLayout";
import { DarkMode } from "./context/DarkModeContext";

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
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="nha-dat-ban" element={<ListingPage />} />
              {/* base on type to filter query data */}
              <Route path="nha-dat-ban/:type" element={<ListingPage />} />
              <Route path="nha-dat-cho-thue" element={<ListingPage />} />
              <Route path="nha-dat-cho-thue/:type" element={<ListingPage />} />
              <Route path="du-an" element={<Projects />} />
              <Route path="/:product" element={<Details />} />
              <Route path="tin-tuc" element={<News />} />
              <Route path="danh-ba" element={<Contacts />} />
              <Route path="dang-nhap" element={<Login />} />
              <Route path="dang-ky" element={<Register />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
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
