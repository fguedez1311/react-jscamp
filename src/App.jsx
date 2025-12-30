import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import JobListing from "./components/JobListing";
import { Pagination } from "./components/Pagination";
import { SearchFormSection } from "./components/SearchFormSection";


function App() {
  const [currentPage,setCurrentPage]=useState(1)
  const totalPages=5
  const handlePageChange=(page)=>{
    console.log('Cambiamos a la página',page)
    setCurrentPage(page)
  }
  console.log("render App")
  
  return (
    <>
      <Header />
      <main>
        <SearchFormSection/>
        <section className="resultados">
         <JobListing />
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default App;
