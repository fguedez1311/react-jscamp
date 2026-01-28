import { useEffect, useState } from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { NoFoundPage } from "./pages/404";
import { useRouter } from "./hooks/useRouter";

function App() {
  const {currentPath}=useRouter()

  let page = <NoFoundPage />;
  if (currentPath === "/") {
    page = <HomePage />;
  } else if (currentPath === "/search") {
    page = <SearchPage />;
  }
  
  return (
    <>
      <Header />
      {page}

      <Footer />
    </>
  );
}

export default App;
