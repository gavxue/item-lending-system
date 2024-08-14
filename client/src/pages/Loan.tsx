import axios from 'axios'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Success from '../components/Success';
import Error from '../components/Error';
import Loading from '../components/Loading';

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    item: yup.string().required()
})

export default function Loan() {
    const [status, setStatus] = useState({ status: 'none', message: '' })
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: any) => {
        setLoading(true)
        await axios.post(`${import.meta.env.VITE_API_URL}/loan`, data)
            .then(async (res) => {
                setLoading(true)
                setStatus({ status: 'success', message: 'Itemed signed out successfully!' })
                return await axios.post(`${import.meta.env.VITE_API_URL}/loan/email`, res.data)
            })
            .then((res) => {
                setLoading(false)
                setStatus({ status: 'success', message: 'Confirmation email sent successfully!' })
            })
            .catch((err) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}` })
                setLoading(false)
            })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <section className="w-50 m-auto">
            <h1>Loan Item</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" id="name" {...register('name')} />
                    {errors.name && (
                        <div className="alert alert-warning my-3 py-1" role="alert">
                            {errors.name?.message}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input className="form-control" id="email" {...register('email')} />
                    {errors.email && (
                        <div className="alert alert-warning my-3 py-1" role="alert">
                            {errors.email?.message}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="item" className="form-label">Item</label>
                    <input className="form-control" id="item" {...register('item')} />
                    {errors.item && (
                        <div className="alert alert-warning my-3 py-1" role="alert">
                            {errors.item?.message}
                        </div>
                    )}
                </div>
                <input type="submit" className="btn btn-primary" disabled={loading} />
            </form>
            {status.status === 'success' && (
                <Success message={status.message} forUser={loading} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={true} />
            )}
            {loading && <Loading message={status.status === 'none' ? 'Processing request. This can take a minute.' : 'Email is sending...'} />}
        </section>
    )
}