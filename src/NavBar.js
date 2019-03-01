import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';



class NavBar extends React.Component {
    render() {
        let addReport;
        let divider;
        let button;
        console.log(this.props.token);
        if (this.props.token) {
            divider = <DropdownItem divider />;
            addReport = <Link className="nav-link" to="/addreport">New</Link>;
            button = <Link className="nav-link" to="/logout">Log out</Link>;
        } else {
            button = <Link className="nav-link" to="/login">Log in</Link>;
        }
        return (
            <Navbar light expand="md">
                {/* <img src={logo} alt="logo"></img> */}
                <Nav navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">Me</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Reports
                    </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <Link className="nav-link" to="/report/kmom01">kmom01</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link className="nav-link" to="/report/kmom02">kmom02</Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link className="nav-link" to="/report/kmom03">kmom03</Link>
                            </DropdownItem>
                            {divider}
                            <DropdownItem>
                                {addReport}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        {button}
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;