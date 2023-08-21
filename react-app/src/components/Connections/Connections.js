import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserThunk } from '../../store/user'

const Connections = () => {

const { userId } = useParams();
const dispatch = useDispatch();
const [loading, setLoading] = useState(true);

const user = useSelector((state) => state.user.singleUser);
const followerFirstNames = user?.followers?.map(follower => follower);
console.log("First Names of Followers:", followerFirstNames);


useEffect(() => {
    setLoading(true);
    async function fetchUserData() {
        await dispatch(getSingleUserThunk(userId));
        setLoading(false);
    }
    fetchUserData();
}, [dispatch, userId]);

if (loading) {
    return <div>Loading...</div>;
}

if (!user) {
    return <div>Loading...</div>;
}

return (
    <div >
        <div >
                    <h2>Recent Follows</h2>
                <div >
                    {followerFirstNames.map((userr) => (
                        <div key={userr.id} >
                            <img
                                src={userr.profile_image}
                                style={{ width: "20px" }}
                            />
                            <p>{userr.first_name} {userr.last_name}</p>
                        </div>
                    ))}
                 
                    
                </div>
        
           
        </div>
        <div className="single-user-right-section">
        <div className="right-section">
            <div className="news-articles">
                <h3>Clockdn News</h3>
               
                <a href="https://blog.appacademy.io/best-programming-languages-for-game-development/" target="_blank" rel="noopener noreferrer">5 Best Programming Languages for Game Development</a>
                
                <a href="https://blog.appacademy.io/what-is-javascript-used-for/" target="_blank" rel="noopener noreferrer">What Can You Do With JavaScript? 7 JavaScript Applications</a>
              
                <a href="https://blog.appacademy.io/best-programming-languages-for-ai-development/" target="_blank" rel="noopener noreferrer">6 Best Programming Languages for AI Development</a>
               
               
                <a href="https://blog.appacademy.io/what-is-python-used-for/" target="_blank" rel="noopener noreferrer">What is Python Used For? 9 Applications & Examples</a>
               
              
                <a href="https://blog.appacademy.io/famous-black-coders-and-software-engineers/" target="_blank" rel="noopener noreferrer">6 Black Software Engineers Who Are Changing the World</a>
               
            </div>
        </div>
        </div>

    </div>
);
};

export default Connections