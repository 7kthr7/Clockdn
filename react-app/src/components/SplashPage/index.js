import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Splash.css";
import LoginFormPage from "../LoginFormPage";
import { useHistory } from 'react-router-dom';
import splashOne from '../../assets/splash4.png'


function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();


  if (sessionUser) return <Redirect to="/home" />;
  const handleOnClick = async (e) => {
    e.preventDefault();
    history.push('/signup')
  }

    return (
        <div className="splash-page" >
            <div className="first-section">
                <div className="first-section-left">
                <div className="splash-page-tag-line">
                    <h1>It's Time for New Connections, It's Time for Clockdn.</h1>
                </div>
                <div className="log-in-section">
                    <LoginFormPage />
                    <h2>---------- or ----------</h2>
                    <button className="join-now-splash"
                    onClick={handleOnClick}> New to Clockdn? Join now</button>
                </div>
                </div>
                <div className="splash-page-image">
                    <img
                        src={splashOne}
                    />
                    

                </div>

            </div>

        </div>
    );
}

export default SplashPage;
