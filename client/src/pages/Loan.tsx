export default function Loan() {
    return (
        <main className="container">
            <form action="/">
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label for="item" className="form-label">Item</label>
                    <input type="text" className="form-control" id="item" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </main>
    )
}