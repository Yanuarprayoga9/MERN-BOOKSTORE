import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function BookList() {
    const [books, setBook] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBook = async () => {
            await axios.get('http://localhost:5555/books/')
                .then((result) => {
                    setBook(result.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err.message)
                    setLoading(false);
                }

                )
        }
        getBook()
    }, [])
    return (
        <div>
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
