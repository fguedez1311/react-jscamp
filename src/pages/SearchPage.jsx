import { useState,useEffect } from "react";

import JobListing from "../components/JobListing";
import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";


const RESULTS_PER_PAGE=4

const useFilters=()=>{
  const [filters,setFilters]=useState({
      technology: "",
      location: "",
      experienceLevel:""
    })
  const [textToFilter,setTextToFilter]=useState('')
  const [currentPage,setCurrentPage]=useState(1)
   // Estado para los empleos (inicialmente vacío)
  const [jobs, setJobs] = useState([])

  // Estado para indicar que estamos cargando
  const [loading, setLoading] = useState(true)

  // Estado para el total de resultados
  const [total, setTotal] = useState(0)

  useEffect(() => {
      async function fetchJobs(){ 
        try{
            const response= await fetch('https://jscamp-api.vercel.app/api/jobs')
            const json=await response.json()
            setJobs(json.data)
            setTotal(json.total)
        }
        catch (error){
          console.log('Error fetching jobs: ',error)
        }
        finally { 
            setLoading(false)
        }
      }
      fetchJobs()
  }, []) // Array vacío = solo al montar el componente

  
  const totalPages=Math.ceil(jobs.length/RESULTS_PER_PAGE)
  
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
  return{
     jobs,
     total,
     loading,
     totalPages,
     currentPage,
     handlePageChange,
     handleSearch,
     handleTextFilter
  }
}
export function SearchPage() {

  const {
     jobs,
     total,
     loading,
     totalPages,
     currentPage,
     handlePageChange,
     handleSearch,
     handleTextFilter
  }=useFilters()
  
  useEffect(() => {
    document.title=`Resultados: ${total}, Pagina ${currentPage}-DevJobs `
  },[total,currentPage])

   
  return (
    <>
      
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>
        <section className="resultados">
        {
          loading ? <p>Cargando empleos...</p> : <JobListing jobs={jobs} />
        }
      
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>
     
    </>
  );
}

