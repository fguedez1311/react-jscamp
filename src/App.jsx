import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import JobListing from "./components/JobListing";
import { Pagination } from "./components/Pagination";
import { SearchFormSection } from "./components/SearchFormSection";


function App() {
  const handlePageChange=(page)=>{
    console.log('Cambiamos a la página',page)
  }
  
  return (
    <>
      <Header />
      <main>
        <SearchFormSection/>
        <section className="resultados">
         <JobListing />
         <Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange}/>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default App;
