import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Container,
} from "reactstrap";
import { logout } from "../../actions/auth";
import logo from "../../assets/img/logo.png";

const NavbarMenu = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <NavLink href="/profiles">Developers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/posts">Community</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/dashboard">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <a onClick={logout} href="#!" className="nav-link">
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink href="/profiles/">Developers</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/register/">Join</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/login/">Login</NavLink>
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar color="white" expand="md" className="py-3 d-block">
      <Container>
        <NavbarBrand href="/" className="mr-auto brand">
          <img src={logo} height="30" alt="JOBCommunity" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2 custom-toggler" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-md-auto" navbar>
            {!loading && (
              isAuthenticated ? authLinks : guestLinks
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

NavbarMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarMenu);
