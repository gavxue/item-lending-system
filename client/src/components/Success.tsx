export default function Success({ message, forUser }) {
    return (
        <div className="alert alert-success my-3 pb-0" role="alert">
            <p className="fw-bold">Success</p>
            <p>{message}</p>
            {forUser && <p>You will receive a confirmation email shortly.</p>}
        </div>
    )
}