import "./App.css";
import Card from "./components/card/card";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <>
      <NavBar />

      <div>
        <Card />
      </div>

      <Footer />
    </>
  );
}

export default App;
