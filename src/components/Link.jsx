export default function Link({ href, children, ...restOfProps }) {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <a href={href} {...restOfProps} onClick={handleClick}>
        {children}
    </a>
  )
}
