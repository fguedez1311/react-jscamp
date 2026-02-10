import { useState,useEffect } from "react";

import JobListing from "../components/JobListing";
import { Pagination } from "../components/Pagination";
import { SearchFormSection } from "../components/SearchFormSection";
import {useRouter} from "../hooks/useRouter.js"

const RESULTS_PER_PAGE=4


const useFilters=()=>{
  const [filters,setFilters]=useState(()=>{
      const params=new URLSearchParams(window.location.search)
      return{
          technology:params.get('technology') || '',
          location:params.get('type') || '',
          experienceLevel:params.get('level') || '',
      }
  })
  const [textToFilter,setTextToFilter]=useState(()=>{
      const params=new URLSearchParams(window.location.search)
      return params.get('text') || ''
  })
  const [currentPage,setCurrentPage]=useState(()=>{
      const params=new URLSearchParams(window.location.search)
      const page=Number(params.get('page'))
      return Number.isNaN(page) ? page : 1
  })
   // Estado para los empleos (inicialmente vacío)
  const [jobs, setJobs] = useState([])

  // Estado para indicar que estamos cargando
  const [loading, setLoading] = useState(true)

  // Estado para el total de resultados
  const [total, setTotal] = useState(0)
  const {navigateTo}=useRouter()

  useEffect(() => {
      async function fetchJobs(){ 
        try{
            setLoading(true)
            const params=new URLSearchParams()
            if(textToFilter) params.append('text',textToFilter)
            if (filters.technology) params.append('technology',filters.technology)
            if (filters.location) params.append('type',filters.location)
            if (filters.experienceLevel) params.append('level',filters.experienceLevel)
            const offset=(currentPage-1)*RESULTS_PER_PAGE
            params.append('limit',RESULTS_PER_PAGE)
            params.append('offset',offset)

            const queryParams=params.toString()
            const response= await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
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
  }, [filters,textToFilter,currentPage]) // Array vacío = solo al montar el componente
  useEffect(()=>{
      const params=new URLSearchParams()
      if (textToFilter) params.append('text',textToFilter)
      if (filters.technology) params.append('technology',filters.technology)
      if (filters.location) params.append('type',filters.location)
      if (filters.experienceLevel) params.append('level',filters.experienceLevel)
      if (currentPage>1) params.append('page',currentPage)
      
      const newUrl=params.toString()
                   ? `${window.location.pathname}?${params.toString()}`
                   :window.location.pathname
      navigateTo(newUrl)             
  },[filters,textToFilter,currentPage,navigateTo])
  
  const totalPages=Math.ceil(total/RESULTS_PER_PAGE)
  
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
     textToFilter,
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
     textToFilter,
     handlePageChange,
     handleSearch,
     handleTextFilter
  }=useFilters()
  
  
  const title= loading ? `Cargando...- DevJobs` : `Resultados: ${total}, Página ${currentPage}-DevJobs`
   
  return (
    <>
      
      <main>
        <title>{title}</title>
        <SearchFormSection
             initialText={textToFilter}
             onSearch={handleSearch} 
             onTextFilter={handleTextFilter}
         />
         
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

