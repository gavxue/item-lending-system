import { Alert } from '../../types'

export default function ({ message, forUser }: Alert) {
    return (
        <div className="alert alert-danger my-3 pb-0" role="alert">
            <p className="fw-bold">Error</p>
            {forUser && <p>Please contact IT for support.</p>}
            <p>Error message: {message}</p>
        </div>
    )
}