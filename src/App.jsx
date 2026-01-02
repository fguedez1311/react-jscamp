import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import JobListing from "./components/JobListing";
import { Pagination } from "./components/Pagination";
import { SearchFormSection } from "./components/SearchFormSection";
import jobsData from "./data.json";

const RESULTS_PER_PAGE=5
function App() {
  const [currentPage,setCurrentPage]=useState(1)
  const totalPages=Math.ceil(jobsData.length/RESULTS_PER_PAGE)
  const pageResults=jobsData.slice(
    (currentPage-1)*RESULTS_PER_PAGE,
    currentPage*RESULTS_PER_PAGE
  )
  const handlePageChange=(page)=>{
   
    setCurrentPage(page)
  }
 
  
  return (
    <>
      <Header />
      <main>
        <SearchFormSection/>
        <section className="resultados">
         <JobListing jobs={pageResults} />
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default App;
