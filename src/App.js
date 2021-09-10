import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer";
import LullifyRouter from "./components/LullifyRouter";
import { VideoController } from "./context/VideoContext";
import { UserController } from "./context/UserContext";
import { PlaylistController } from "./context/PlaylistContext";
import { QueryController } from "./context/QueryContext";
import { EscapeController } from "./context/EscapeContext"

const App = () => {
  const handlePageScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <VideoController>
        <UserController>
          <PlaylistController>
            <QueryController>
              <EscapeController>
                <Navigation handlePageScroll={handlePageScroll} />
                <LullifyRouter />
                <Footer />
              </EscapeController>
            </QueryController>
          </PlaylistController>
        </UserController>
      </VideoController>
    </div>
  );
};

export default App;
