import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'
import Loading from '../components/Loading'

export default function Admin() {
    const [status, setStatus] = useState({ status: 'none', message: '' })
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>()

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/admin`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReminder = async (e: Event, data: any) => {
        e.preventDefault()
        setLoading(true)
        await axios.post(`${import.meta.env.VITE_API_URL}/admin`, { ...data })
            .then((res) => {
                setStatus({ status: 'success', message: 'Reminder email sent successfully!' })
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <h1>Admin</h1>
            <div className='my-3'>
                <a href="https://supabase.com/dashboard/project/mrleaqcuxookdxovglow/editor" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Database</a>
                <a href="https://dashboard.render.com/" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Hosting site</a>
                <a href="" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Documentation (todo)</a>
                <a href="https://github.com/gavxue/item-lending-system" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Source code</a>
            </div>
            {status.status === 'success' && (
                <Success message={status.message} forUser={false} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={false} />
            )}
            {loading && <Loading message={status.status === 'none' ? 'Getting data from database. This can take a minute.' : 'Email is sending...'} />}
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
                                        <button className="btn btn-primary py-0" onClick={(e: any) => handleReminder(e, entry)}>Send</button>
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