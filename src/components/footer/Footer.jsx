import styled from "styled-components";
import Facebook from "../../assets/icons/Facebook.svg";
import Instagram from "../../assets/icons/Instagram.svg";

const FooterContainer = styled.footer`
  background-color: #ffff;
  color: black;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 10px;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const IconContainer = styled.div`
  display: flex;

  img {
    width: 35px;
    height: 35px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} FreshAir. Todos los derechos
        reservados.
      </FooterText>
      <IconContainer>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="Instagram" />
        </a>
      </IconContainer>
    </FooterContainer>
  );
};

export default Footer;
