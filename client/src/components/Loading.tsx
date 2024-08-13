export default function Loading({ message }) {
    return (
        <div className="alert alert-warning my-3 d-flex gap-3 align-items-center" role="alert">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className='m-0'>{message}</p>
        </div>
    )
}