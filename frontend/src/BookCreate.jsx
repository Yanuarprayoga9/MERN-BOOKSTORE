import axios from 'axios'
import { useState } from 'react'

function BookCreate() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishedYear] = useState(0);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const book = {
            title,
            author,
            publishYear
        }
        console.log(book)
        try {
            await axios.post('http://localhost:5555/books', book)
                .then(() => {
                    alert("err.message")
                })

        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        title
                    </label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="title"
                            autoComplete="title"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        author
                    </label>
                    <div className="mt-2">
                        <input
                            id="author"
                            name="author"
                            type="author"
                            autoComplete="author"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => { setAuthor(e.target.value) }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="publishYear" className="block text-sm font-medium leading-6 text-gray-900">
                        publishYear
                    </label>
                    <div className="mt-2">
                        <input
                            id="publishYear"
                            name="publishYear"
                            type="publishYear"
                            autoComplete="publishYear"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => { setPublishedYear(e.target.value) }} />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookCreate