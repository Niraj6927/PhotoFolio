import AlbumList from "./components/AlbumList/AlbumList";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      {/* upper navbar of the page */}
      <Navbar />

      {/* main container of the page */}
      <AlbumList />
    </>
  );
}

export default App;
