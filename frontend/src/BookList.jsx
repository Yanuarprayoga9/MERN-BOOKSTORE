import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Logout from './auth/Logout';

export default function BookList() {
    const [books, setBook] = useState([{ id: "jkas", title: "title", author: "hjsa", publishYear: "" }])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getBook = async () => {
            const token  = localStorage.getItem('token');
            console.log(token)
            await axios.get('http://localhost:5555/books/',{
                headers: {
                  'Authorization': `Bearer ${token}`, // Mengirimkan token dalam header
                },
              })
                .then((result) => {
                    setBook(result.data.data);
                    
                   localStorage.removeItem('token')
                    if (result.data == "acces denied") {
                        navigate("/login")
                    }
                    console.log(result.headers['Auhorization'])
                    // else if (result.headers['Auhorization']){
                    //     navigate('/login')
                    // }
                    setLoading(false);
                    
                })
                .catch((err) => {
                    console.log(err.message)
                    setLoading(false);
                }

                )
        }
        const auth = async () => {
            await axios.get('http://localhost:5555/books/')
            .then(res => {
                console.log(res.headers['Authorization'])
            })
        }
        getBook()
        auth()
    }, [])
    return (
        <div>
            <Logout/>
            {loading ? <Loading /> :
                <table className="border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <td className="border border-slate-600">id</td>
                            <td className="border border-slate-600">title</td>
                            <td className="border border-slate-600">author</td>
                            <td className="border border-slate-600">publishYear</td>
                            <td className="border border-slate-600">action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) => (
                                <tr key={index}>
                                    <td className="border border-slate-700">{book._id}</td>
                                    <td className="border border-slate-700">{book.title}</td>
                                    <td className="border border-slate-700">{book.author}</td>
                                    <td className="border border-slate-700">{book.publishYear}</td>
                                    <td className="border border-slate-700">
                                        <Link to={`/edit/${book._id}`}>Edit</Link>
                                    </td>
                                </tr>))
                        }

                    </tbody>
                </table>
            }

        </div>
    )
}
BookList.propTypes = {
    books: PropTypes.object,


};
