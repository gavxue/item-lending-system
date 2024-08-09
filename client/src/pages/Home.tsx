export default function Home() {
    return (
        <div className="container">
            <h1>HOME</h1>
            <p>Welcome to the CEE IT item lending system! Select an option below to continue.</p>
            <a className="btn btn-primary" href="/loan" role="button">Loan an item</a>
            <a className="btn btn-primary" href="/return" role="button">Return an item</a>
        </div>
    )
}