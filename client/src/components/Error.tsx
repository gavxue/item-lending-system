export default function Error({ message }) {
    return (
        <div className="alert alert-danger my-3" role="alert">
            <p className="fw-bold">Error</p>
            <p>Error message: {message}</p>
        </div>
    )
}