import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'
import Loading from '../components/Loading'

export default function Return() {
    const [status, setStatus] = useState({ status: 'none', message: '' })
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>()

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/return`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReturn = async (e: Event, id: number) => {
        e.preventDefault()
        setLoading(true)
        await axios.post(`${import.meta.env.VITE_API_URL}/return`, { id: id })
            .then(async (res) => {
                setStatus({ status: 'success', message: 'Item returned successfully!' })
                fetchData()
                setLoading(true)
                return await axios.post(`${import.meta.env.VITE_API_URL}/return/email`, res.data)
            })
            .then((res) => {
                setStatus({ status: 'success', message: 'Confirmation email sent successfully!' })
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading(false))
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
                            <tr key={entry.id} >
                                <th className="fw-normal">{entry.name}</th>
                                <th className="fw-normal">{entry.item}</th>
                                <th className="fw-normal">{entry.date_loan}</th>
                                <th>
                                    <button className="btn btn-primary py-0" onClick={(e: any) => handleReturn(e, entry.id)}>Return</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {status.status === 'success' && (
                <Success message={status.message} forUser={loading} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={true} />
            )}
            {loading && <Loading message={status.status === 'none' ? 'Getting data from database. This can take a minute' : 'Email is sending...'} />}
        </>
    )
}