export default function Success({ message }) {
    return (
        <div className="alert alert-success my-3" role="alert">
            <p className="fw-bold">Success</p>
            <p>{message}</p>
            <p>You will receive a confirmation email shortly.</p>
        </div>
    )
}