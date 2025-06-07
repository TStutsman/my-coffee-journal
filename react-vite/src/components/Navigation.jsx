import { useModal } from '@context';
import { Link, NavLink } from 'react-router-dom';
import { BrewForm, CoffeeForm } from '@components';
import './Navigation.css';

function Navigation() {
    const { setModalContent } = useModal();

    return (
        <>
            <nav>
                <NavLink to="/coffees">
                <svg id='coffee-icon' strokeMiterlimit="10" version="1.1" viewBox="0 0 180 180" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" fill='currentColor'>
                    <path d="M139.485 36.2768C138.258 35.3389 135.395 34.9877 134.355 36.5814C132.503 39.4191 132.12 42.1997 123.202 57.1207C113.894 72.6946 104.953 78.8477 86.8789 94.9415C68.9621 110.895 55.7773 139.614 57.034 148.062C57.2085 149.235 58.7178 150.967 59.8327 151.353C81.7444 156.841 109.734 146.753 130.031 123.797C155.574 94.9093 159.448 56.4449 139.485 36.2768ZM126.734 27.559C104.096 17.7666 72.2702 27.476 49.816 52.8711C23.4698 82.6679 20.0457 122.699 42.1942 142.283C42.892 142.9 43.6598 143.391 44.3908 143.953C45.5401 144.538 46.54 143.48 47.0047 142.403C48.1191 139.821 47.1962 138.757 55.3397 121.983C70.3283 91.1079 90.8763 82.9356 103.96 69.0394C116.587 55.6292 119.571 48.7579 127.531 30.4931C127.803 29.8695 127.858 28.2096 126.734 27.559Z" opacity="1" stroke="none"/>
                </svg>
                </NavLink>
                <button onClick={() => setModalContent(<CoffeeForm/>)}>
                    + Coffee
                </button>
                <Link to='/' id='nav-logo'><h1>Coffee Journal</h1></Link>
                <NavLink to="/brews">
                    <svg id='brew-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='currentColor'>
                        <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43 96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/>
                    </svg>
                </NavLink>
                <button onClick={() => setModalContent(<BrewForm/>)}>
                    + Brew
                </button>
            </nav>
        </>
    )
}

export default Navigation;