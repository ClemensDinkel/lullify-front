import "../App.css";
import ContentList from "./ContentList";
import AddContent from "./AddContent";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const CreatorPanel = () => {
  const { dTk } = useContext(UserContext)
  return (
    <>
      {(dTk && dTk[0]) && (dTk[0].role === "admin" || dTk[0].role === "content_creator") ?
        <div className="creator-panel">
          <ContentList />
          <AddContent />
        </div>
        : <p>Access denied</p>
      }
    </>
  );
};

export default CreatorPanel;
