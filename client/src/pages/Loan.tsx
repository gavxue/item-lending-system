import axios from 'axios'
import { useState } from 'react'

export default function Loan() {
    const [data, setData] = useState({
        name: "",
        email: "",
        item: "",
    })

    const handleChange = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.id]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/loan', data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }

    return (
        <main className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="item" className="form-label">Item</label>
                    <input type="text" className="form-control" id="item" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}