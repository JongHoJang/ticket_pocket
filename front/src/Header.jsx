import {Link} from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header className='header-container'>
            <div className="header-logo">
                <h1><Link to='#'>TIPO</Link></h1>
                <p>"Your Ticket At The Pocket"</p>
            </div>

            <div className="header-gnb">
                <ul>
                    <li><Link to='#' className="menu-item">영화</Link></li>
                    <li><Link to='#' className="menu-item">공연</Link></li>
                    <li><Link to='#' className="menu-item">전시</Link></li>
                </ul>
            </div>
        </header>
    );
}


export default Header;
