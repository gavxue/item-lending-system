import axios from 'axios'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    item: yup.string().required()
})

export default function Loan() {

    const onSubmit = async (data) => {
        await axios.post('http://localhost:3000/loan', data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <section className="w-50 m-auto">
            <h1>Loan Items</h1>
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
                <input type="submit" className="btn btn-primary" />
            </form>
        </section>
    )
}