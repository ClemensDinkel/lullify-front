import "../App.css";
import ContentList from "./ContentList";
import AddContent from "./AddContent";
import { UserContext } from "../context/UserContext";
import {useContext} from 'react'

const CreatorPanel = () => {
  const { dTk } = useContext(UserContext);
  const [decToken, setDecToken] = dTk;
  return (
    <>
     {decToken &&
      <div className="creator-panel">
      <ContentList />

      <AddContent />
    </div>
    }
    </>
  );
};

export default CreatorPanel;
