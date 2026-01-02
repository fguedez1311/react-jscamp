import data from "../data.json";
import { JobCard } from "./JobCard";
export default function JobListing() {
  return (
    <>
      <h2 className="resultados__h2">Resultados de búsqueda</h2>

      <div className="resultados__jobslistings">
        {data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
