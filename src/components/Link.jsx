import { useRouter } from "../hooks/useRouter";
export  function Link({ href, children, ...restOfProps }) {
  const {navigeTo}=useRouter()
  const handleClick = (event) => {
    event.preventDefault();
    navigeTo(href)
    
  };
  return (
    <a href={href} {...restOfProps} onClick={handleClick}>
        {children}
    </a>
  )
}
