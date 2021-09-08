import teamList from "./teamList"
import { Member } from "./Member"
import team1a from "../../images/team1a.JPG";
import team2a from "../../images/team2a.jpg";
import team3a from "../../images/team3a.jpg";

export const Team = () => {
  const images = [team1a,team2a,team3a]

  return (
    <div>
      <h1 style={{ fontFamily: "cursive", color: "white" }}>
        Meet our team
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      > {teamList.map((member, index) =>
        <Member member={member} image={images[index]} key={index} />
      )}
      </div>
    </div>
  )
}