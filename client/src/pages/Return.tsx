import { useState, useEffect } from 'react'
import axios from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'
import Loading from '../components/Loading'

export default function Return() {
    const [status, setStatus] = useState({ status: 'none', message: '', user: true })
    const [loading, setLoading] = useState({ loading: false, message: '' })
    const [data, setData] = useState<any[]>()

    const fetchData = async () => {
        setLoading({ loading: true, message: 'Fetching data...' })
        await axios.get(`${import.meta.env.VITE_API_URL}/return`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}`, user: true })
            })
            .finally(() => setLoading({ loading: false, message: '' }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReturn = async (e: Event, id: number) => {
        e.preventDefault()
        setStatus({ status: 'none', message: '', user: true })
        setLoading({ loading: true, message: 'Processing request...' })
        await axios.post(`${import.meta.env.VITE_API_URL}/return`, { id: id })
            .then(async (res) => {
                setStatus({ status: 'success', message: 'Item returned successfully!', user: true })
                await fetchData()
                return res
            })
            .then(async (res) => {
                setLoading({ loading: true, message: 'Sending email...' })
                return await axios.post(`${import.meta.env.VITE_API_URL}/return/email`, res.data)
            })
            .then((res) => {
                setStatus({ status: 'success', message: 'Confirmation email sent successfully!', user: false })
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}`, user: true })
            })
            .finally(() => setLoading({ loading: false, message: '' }))
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
                <Success message={status.message} forUser={status.user} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={true} />
            )}
            {loading.loading && <Loading message={loading.message} />}
        </>
    )
}