import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Pizza Order
                </NavLink>
                <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link">
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;