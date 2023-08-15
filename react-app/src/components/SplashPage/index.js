import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Splash.css";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="splash-page" >
        <div className="splash-page-tag-line">
            <h1>TIME TO NETWORK TIME TO SUCEED</h1>
        </div>
        
    </div>
  );
}

export default SplashPage;
