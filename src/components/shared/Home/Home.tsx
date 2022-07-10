import './Home.css';
import { useAuth } from "../../../context/authContext";
import { useNavigate } from 'react-router-dom';
import HomeDoctor from '../HomeDoctor/HomeDoctor';
import Topbar from '../../layouts/Topbar/Topbar';
import HomeUser from '../HomeUser/HomeUser';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

function Home() {
    const { user } = useAuth();

    return (
        <div>
            <Topbar user={user} />
            <div className='home-main-container'>
                {
                    (user.role == 1 && 
                    <HomeAdmin />) ||
                    (user.role == 2 && 
                    <HomeDoctor />) ||
                    (user.role == 3 && 
                    <HomeUser />)
                }
            </div>
        </div>
    )
}

export default Home;
