import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { Route } from "./components/Route";

function App() {
  
  
  return (
    <>
      <Header />
        <Route path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />

      <Footer />
    </>
  );
}

export default App;
