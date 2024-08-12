import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'

export default function Return() {
    const [status, setStatus] = useState({ status: 'none', message: '' })
    const [data, setData] = useState()

    const fetchData = async () => {
        await axios.get('http://localhost:3000/return')
            .then((res) => setData(res.data))
            .catch((err) => setStatus({ status: 'error', message: err.message }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReturn = async (e, id) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/return', { id: id })
            .then((res) => setStatus({ status: 'success', message: 'Item returned successfully!' }))
            .catch((err) => setStatus({ status: 'error', message: err.message }))
        fetchData()
    }

    return (
        <>
            <h1>Return Item</h1>
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
            {status.status === 'success' && (
                <Success message={status.message} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} />
            )}
        </>
    )
}