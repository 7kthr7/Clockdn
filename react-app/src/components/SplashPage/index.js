import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Splash.css";
import LoginFormPage from "../LoginFormPage";
import { useHistory } from 'react-router-dom';
import splashOne from '../../assets/splash4.png'
import splashTwo from '../../assets/splashTwo.gif'


function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();


  if (sessionUser) return <Redirect to="/home" />;
//   const handleOnClick = async (e) => {
//     e.preventDefault();
//     history.push('/signup')
//   }

    return (
        <div className="splash-page" >
            <div className="first-section">
                <div className="first-section-left">
                <div className="splash-page-tag-line">
                    <p>It's Time For New Connections</p>
                    <p> It's Time For Clockdn.</p>
                </div>
                <div className="log-in-section">
                    <LoginFormPage />
                </div>
                </div>
                <div className="splash-page-image">
                    <img
                        src={splashOne}
                    />
                </div>
            </div>

            <div className="second-section-splash">
                <div className="splash-page-image-two">
                    <img
                    src={splashTwo}
                    />
                </div>

            </div>

        </div>
    );
}

export default SplashPage;
