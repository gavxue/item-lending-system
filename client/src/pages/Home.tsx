export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <p>Welcome to the CEE IT item lending system! Select an option below to continue.</p>
            <div className="d-flex justify-content-center my-5">
                <a className="btn btn-primary fs-2 me-5" href="/loan" role="button">Loan an item</a>
                <a className="btn btn-primary fs-2" href="/return" role="button">Return an item</a>
            </div>
            <div className="my-5">
                <h2>Who we lend to</h2>
                <p>We only lend to <span className="fw-bold">professors and graduate students</span> of the Department of Civil and Environmental Engineering. We <span className="fw-bold">do not lend to undergradute students</span>. If you are a staff member, we may be able to give you the item to take or you can place an order for it.</p>
            </div>
            <div className="my-5">
                <h2>Items that we lend</h2>
                <ul>
                    <li>Adapters (USB, HDMI, DVI, VGA, DisplayPort, etc)</li>
                    <li>Keyboards and mice</li>
                    <li>HD/CD Readers</li>
                    <li>Portable projectors</li>
                    <li>Power bars</li>
                    <li>Surface Hubs</li>
                    <li>TV carts</li>
                </ul>
                <p>Note: this list is subject to change depending on current inventory and availability.</p>
            </div>
            <p>If you have any questions, please submit a request through our help portal (QR code is on our front door).</p>
        </>
    )
}