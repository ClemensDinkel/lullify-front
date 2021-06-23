import "../App.css";
import ContentList from "./ContentList";
import AddContent from "./AddContent";

const CreatorPanel = () => {
  return (
    <>
      <div className="creator-panel">
        <ContentList />

        <AddContent />
      </div>
    </>
  );
};

export default CreatorPanel;
