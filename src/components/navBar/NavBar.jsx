import styled from "styled-components";
import logo from "../../assets/icons/logo.svg";

const Navbar = styled.nav`
  background-color: #ffff;
  padding: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  position: sticky;
`;

const NavLogo = styled.div`
  font-size: 24px;
  color: black;
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
    width: 40px; /* Ajusta el tamaño según tus necesidades */
    height: auto;
  }
`;

const NavLinks = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
`;

const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: green;
  }
`;

const Nav = () => {
  return (
    <Navbar>
      <NavLogo>
        <img src={logo} alt="Logo" />
        FreshAir
      </NavLogo>
      <NavLinks>
        <NavLink href="#home">Mis Cuidades</NavLink>
        <NavLink href="#about">Mapa Meteorologico</NavLink>
        <NavLink href="#services">Pronostico Diario</NavLink>
      </NavLinks>
    </Navbar>
  );
};

export default Nav;
