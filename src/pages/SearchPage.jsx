import { useState,useEffect } from "react";

import JobListing from "../components/JobListing";
import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";
import jobsData from "../data.json";

const RESULTS_PER_PAGE=5
export function SearchPage() {
  const [filters,setFilters]=useState({
      technology: "",
      location: "",
      experienceLevel:""
    })
  const [textToFilter,setTextToFilter]=useState('')
  const [currentPage,setCurrentPage]=useState(1)
  
  const jobsFilteredByFilters=jobsData.filter(job=>{
      return(
          (filters.technology==='' || job.data.technology.toLowerCase()===filters.technology.toLowerCase())
      )
  })

  const jobsWithTextFilter=textToFilter===''
     ? jobsFilteredByFilters
     : jobsFilteredByFilters.filter(job=>{
        return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
     })
  const totalPages=Math.ceil(jobsWithTextFilter.length/RESULTS_PER_PAGE)
  const pageResults=jobsWithTextFilter.slice(
    (currentPage-1)*RESULTS_PER_PAGE,
    currentPage*RESULTS_PER_PAGE
  )
  const handlePageChange=(page)=>{
   
    setCurrentPage(page)
  }
  const handleSearch=(filters)=>{
   
     setFilters(filters)
     setCurrentPage(1)
  }
  const handleTextFilter=(newTextToFilter)=>{
      setTextToFilter(newTextToFilter)
      setCurrentPage(1)
  }

  useEffect(() => {
    document.title=`Resultados: ${jobsWithTextFilter.length}, Pagina ${currentPage}-DevJobs `
  },[jobsWithTextFilter,currentPage])
  useEffect(() => {
    // Suscripción a un evento
    const handleResize=()=>{
      console.log("Ventana Redimensionada")
      console.log(window.innerHeight,window.innerWidth)
    }
    window.addEventListener('resize',handleResize)
    //Limpieza: Se ejecuta antes de remontar o antes de rejecutar 
    
    return () => {
      window.removeEventListener('resize',handleResize)
    }
  }, [])
  

  
  return (
    <>
      
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section className="resultados">
         <JobListing jobs={pageResults} />
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
     
    </>
  );
}

