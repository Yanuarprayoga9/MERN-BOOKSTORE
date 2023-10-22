import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
    const navigate = useNavigate()

    const logout = async () => {
        await axios.post('http://localhost:5555/auth/logout',)
            .then((res) => {
                // Check if the response has an 'auth-token' header
                console.log(res.data)
                navigate('/login')

                // Handle the response here
            })
            .catch((err) => {
                alert("katasandi salah");
            });
    }
    return (
        <div>
            <form onSubmit={logout}>
                <input type="submit" value="logout" />
            </form>
        </div>
    )
}

export default Logout