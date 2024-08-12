export default function Error({ message }) {
    return (
        <div className="alert alert-danger my-3" role="alert">
            <p className="fw-bold">Error</p>
            <p>Please contact IT for support.</p>
            <p>Error message: {message}</p>
        </div>
    )
}