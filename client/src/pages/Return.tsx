import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Return() {
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3000/return')
                .then((res) => setData(res.data))
                .catch((err) => console.log(err))
        }
        fetchData()
    }, [])

    const handleReturn = (e, id) => {
        e.preventDefault()
        axios.post('http://localhost:3000/return', { id: id })
    }

    return (
        <main className="container">
            <h1>Return Items</h1>
            {data &&
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Item</th>
                            <th scope="col">Date Loaned</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.id}>
                                <th className="fw-normal">{entry.name}</th>
                                <th className="fw-normal">{entry.item}</th>
                                <th className="fw-normal">{entry.date_loan}</th>
                                <th>
                                    <button className="btn btn-primary" onClick={(e) => handleReturn(e, entry.id)}>Return</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </main>
    )
}