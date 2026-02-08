

import { JobCard } from "./JobCard";
export default function JobListing({jobs}) {
  return (
    <>
      <h2 className="resultados__h2">Resultados de búsqueda</h2>

      <div className="resultados__jobslistings">
      {
        jobs.length===0 && (
          
            <p style={{ textAlign:'center',padding:'1rem',textWrap:'balance'}}>No se han encontrado empleos que coincidan con los criteros de búsqueda</p>
        )
      }
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
