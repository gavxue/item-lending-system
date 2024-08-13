import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'

export default function Admin() {
    const [status, setStatus] = useState({ status: 'none', message: '' })
    const [data, setData] = useState()

    const fetchData = async () => {
        await axios.get('http://localhost:3000/admin')
            .then((res) => setData(res.data))
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}.` })
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReminder = async (e, data) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/admin', { ...data })
            .then((res) => setStatus({ status: 'success', message: 'Reminder email sent successfully!' }))
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
    }

    return (
        <>
            <h1>Admin</h1>
            {status.status === 'success' && (
                <Success message={status.message} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} />
            )}
            {data &&
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Item</th>
                            <th scope="col">Date Loaned</th>
                            <th scope="col">Date Returned</th>
                            <th scope="col">Email Reminder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.id}>
                                <th className="fw-normal">{entry.name}</th>
                                <th className="fw-normal">{entry.email}</th>
                                <th className="fw-normal">{entry.item}</th>
                                <th className="fw-normal">{entry.date_loan}</th>
                                <th className="fw-normal">{entry.date_return ? entry.date_return : '-'}</th>
                                <th>
                                    {entry.date_return ? '' : (
                                        <button className="btn btn-primary" onClick={(e) => handleReminder(e, entry)}>Send</button>
                                    )}

                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </>
    )
}