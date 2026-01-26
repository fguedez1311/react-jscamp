
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import { HomePage } from "./pages/Home";
import {SearchPage} from './pages/SearchPage'
import { NoFoundPage } from "./pages/404";

function App() {
<<<<<<< HEAD
  const currentPath=window.location.pathname
  let page=<NoFoundPage/>
  if (currentPath==='/'){
    page=<HomePage/>
=======
  const [filters,setFilters]=useState({
      technology: "",
      location: "",
      experienceLevel:""
    })
  const [textToFilter,setTextToFilter]=useState('')
  const [currentPage,setCurrentPage]=useState(1)
  
  const jobsFilteredByFilters=jobsData.filter(job=>{
      return(
          (filters.technology==='' || job.data.technology.toLowerCase()===filters.technology.toLowerCase()) &&
          (filters.location === '' || job.data.modalidad === filters.location) &&
          (filters.experienceLevel === '' || job.data.nivel === filters.experienceLevel)
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
>>>>>>> c7e6ee5d916ebaab061878fd16f173808811bcc7
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
