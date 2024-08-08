import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Item Lending System</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse ms-0" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin">Admin</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        // <nav>
        //     <ul>
        //         <li>
        //             <NavLink to='/'>Home</NavLink>
        //         </li>
        //         <li>
        //             <NavLink to='/admin'>Admin</NavLink>
        //         </li>
        //     </ul>
        // </nav>
    )
}