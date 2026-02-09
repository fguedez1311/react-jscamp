import { useState } from "react";
import { useId } from "react";

let timeoutId=null

const useSearchForm = ({idTechnology,idLocation,idExperienceLevel,idText,onSearch,onTextFilter}) => {
  const[searchText,setSearchText]=useState("")
  const handleSubmit = (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if(event.target.name===idText){
      return
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    };

    onSearch(filters);
  };
  const handleTextChange = (event) => {
    const text = event.target.value;
    setSearchText(text) //Actualizamos el input inmediatamente
    //DEBOUNCE: Cancelar el timeout anterior
    if (timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId=setTimeout(()=>{
      onTextFilter(text);
    },500)
  };
  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
};

export function SearchFormSection({ onSearch, onTextFilter }) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();
  // Estado para saber qué campo está activo
  const [focusedField, setFocusedField] = useState(null);
  const {handleSubmit,handleTextChange}= useSearchForm({idTechnology,idLocation,idExperienceLevel,idText,onSearch,onTextFilter})
  return (
    <>
      <section className="jobs-search">
        <h1 className="jobs-search__h1">Encuentra tu próximo trabajo</h1>
        <p className="jobs-search__p">
          Explora miles de oportunidades en el sector tecnológico.
        </p>

        <form
          className="form-busqueda form-busqueda--avanzada"
          id="empleos-search-form"
          role="search"
          onChange={handleSubmit}
        >
          <div className="form-busqueda__div form-busqueda__div--principal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              className="form-busqueda__input"
              name={idText}
              id="empleos-search-input"
              type="text"
              placeholder="Buscar trabajos, empresas o habilidades"
              onFocus={() => setFocusedField("search")}
              onBlur={() => setFocusedField(null)}
              onChange={handleTextChange}
              style={{
                borderColor: focusedField === "search" ? "#4f46e5" : "#d1d5db",
                outline:
                  focusedField === "search" ? "2px solid #4f46e5" : "none",
              }}
            />
          </div>

          <div className="formulario-busqueda__filtros">
            <select name={idTechnology} id="filter-technology" defaultValue="">
              <option value="">Tecnología</option>
              <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
              </optgroup>
              <option value="java">Java</option>
              <hr />
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <hr />
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </select>

            <select name={idLocation} id="filter-location" defaultValue="">
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select
              name={idExperienceLevel}
              id="filter-experience-level"
              defaultValue=""
            >
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>
        <span className="jobs-search__span" id="filter-selected-value"></span>
      </section>
    </>
  );
}
