
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { HomePage } from "./pages/Home";
import {SearchPage} from './pages/SearchPage'
import { NoFoundPage } from "./pages/404";

function App() {
  const currentPath=window.location.pathname
  let page=<NoFoundPage/>
  if (currentPath==='/'){
    page=<HomePage/>
  }
    else if  (currentPath==='/search'){
      page=<SearchPage/>
    }
  return (
    <>
      <Header />
      {
        page
      }
     
      <Footer/>
    </>
  );
}

export default App;
