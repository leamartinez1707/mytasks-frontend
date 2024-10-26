import { Link } from "react-router-dom";

const Logo = () => {
  return <Link to={'/'}> <img className="animate-pulse" src="/logo.svg" alt="Logotipo UpTask Header" /> </Link>;
};

export default Logo;
