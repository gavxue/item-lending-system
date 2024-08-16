import { useState, useEffect } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'

import Error from '../components/Error'
import Success from '../components/Success'
import Loading from '../components/Loading'

import { Status, LoadingStatus } from '../../types'

export default function Admin() {
    const [status, setStatus] = useState<Status>({ status: 'none', message: '' })
    const [loading, setLoading] = useState<LoadingStatus>({ loading: false, message: '' })
    const [data, setData] = useState<any[]>()

    const fetchData = async () => {
        setLoading({ loading: true, message: 'Fetching data...' })
        await axios.get(`${import.meta.env.VITE_API_URL}/admin`)
            .then((res: AxiosResponse) => setData(res.data))
            .catch((err: AxiosError) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading({ loading: false, message: '' }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleReminder = async (e: React.MouseEvent<HTMLButtonElement>, data: any) => {
        e.preventDefault()
        setStatus({ status: 'none', message: '' })
        setLoading({ loading: true, message: 'Sending reminder email...' })
        await axios.post(`${import.meta.env.VITE_API_URL}/admin`, { ...data })
            .then((res: AxiosResponse) => {
                setStatus({ status: 'success', message: 'Reminder email sent successfully!' })
            })
            .catch((err: AxiosError) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
            })
            .finally(() => setLoading({ loading: false, message: '' }))
    }

    return (
        <>
            <h1>Admin</h1>
            <div className='my-3'>
                <a href="https://supabase.com/dashboard/project/mrleaqcuxookdxovglow/editor" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Database</a>
                <a href="https://dashboard.render.com/" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Hosting site</a>
                <a href="https://uofwaterloo.sharepoint.com/:f:/r/sites/tm-env-cee-it-loan/Shared%20Documents/Small%20Items/Item%20lending%20system%20backups?csf=1&web=1&e=712FYO" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Backups</a>
                <a href="https://uwaterloo.atlassian.net/wiki/spaces/CEEIT/pages/44166643784/Item+Lending+System" className="btn btn-secondary me-3" target="_blank" rel="noopener noreferrer">Documentation</a>
                <a href="https://github.com/gavxue/item-lending-system" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Source code</a>
            </div>
            {status.status === 'success' && (
                <Success message={status.message} forUser={false} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={false} />
            )}
            {loading.loading && <Loading message={loading.message} />}
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
                            <tr key={entry.id}>git 
                                <th className={`fw-normal ${entry.date_return ? "text-secondary" : ""}`}>{entry.name}</th>
                                <th className={`fw-normal ${entry.date_return ? "text-secondary" : ""}`}>{entry.email}</th>
                                <th className={`fw-normal ${entry.date_return ? "text-secondary" : ""}`}>{entry.item}</th>
                                <th className={`fw-normal ${entry.date_return ? "text-secondary" : ""}`}>{entry.date_loan}</th>
                                <th className={`fw-normal ${entry.date_return ? "text-secondary" : ""}`}>{entry.date_return ? entry.date_return : '-'}</th>
                                <th>
                                    {entry.date_return ? '' : (
                                        <button className="btn btn-primary py-0" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleReminder(e, entry)}>Send</button>
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