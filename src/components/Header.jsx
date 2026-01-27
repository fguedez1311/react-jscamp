import {Link} from "./Link";

export function Header() {
  return (
    <>
      <header className="header">
        <h1 className="header__h1">
          <svg
            className="header__svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
        <nav className="header__nav">
          <Link href="/" className="header__a">
            Home
          </Link>{" "}
          &nbsp;| &nbsp;
          <Link href="/search" className="header__a">
            Empleo
          </Link>
        </nav>
        <div className="header__div">
          <devjobs-avatar
            service="x"
            username="fguedez1311"
            size="50"
          ></devjobs-avatar>
          <devjobs-avatar
            service="github"
            username="fguedez1311"
            size="50"
          ></devjobs-avatar>
        </div>
      </header>
    </>
  );
}
