import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
    return (
        <nav>
            <Link to='/' id='nav-logo'>My Coffee Journal</Link>
            <NavLink to="/coffees">Coffees</NavLink>
            <NavLink to="/brews">Brews</NavLink>
            <NavLink to="/coffees/new">Add Coffee</NavLink>
            <NavLink to="/brews/new">Add Brew</NavLink>
        </nav>
    )
}

export default Navigation;