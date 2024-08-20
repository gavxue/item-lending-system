import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Success from '../components/Success';
import Error from '../components/Error';
import Loading from '../components/Loading';

import { Status, LoadingStatus, FormData } from '../../types'

const schema = yup.object({
    name: yup.string().test('full name', 'Enter your full name.',
        (value: string) => value.includes(' ')).required('Name is a required field.'),
    email: yup.string().email('Enter a valid email.').test('uwaterloo', 'Enter your uwaterloo email.',
        (value: string) => value.includes('@uwaterloo.ca')).required('Email is a required field.'),
    item: yup.string().required('Item is a required field.')
})

export default function Loan() {
    const [status, setStatus] = useState<Status>({ status: 'none', message: '', user: true })
    const [loading, setLoading] = useState<LoadingStatus>({ loading: false, message: '' })

    const onSubmit = async (data: FormData) => {
        setStatus({ status: 'none', message: '', user: true })
        setLoading({ loading: true, message: 'Processing request...' })
        await axios.post(`${import.meta.env.VITE_API_URL}/loan`, data)
            .then(async (res: AxiosResponse) => {
                setStatus({ status: 'success', message: 'Itemed signed out successfully!', user: true })
                setLoading((loading) => ({ ...loading, message: 'Sending email...' }))
                return await axios.post(`${import.meta.env.VITE_API_URL}/loan/email`, res.data)
            })
            .then((res: AxiosResponse) => {
                setStatus((status) => ({ ...status, message: 'Confirmation email sent successfully!', user: false }))
            })
            .catch((err: AxiosError) => {
                console.log(err)
                setStatus({ status: 'error', message: `${err.message}. ${err.response ? err.response.data : ''}`, user: false })
            })
            .finally(() => {
                setLoading({ loading: true, message: 'Redirecting to homepage in 10 seconds...' })
                setTimeout(() => window.location.replace('/'), 10000)
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
                <input type="submit" className="btn btn-primary" disabled={loading.loading} />
            </form>
            {status.status === 'success' && (
                <Success message={status.message} forUser={status.user} />
            )}
            {status.status === 'error' && (
                <Error message={status.message} forUser={true} />
            )}
            {loading.loading && <Loading message={loading.message} />}
        </section>
    )
}