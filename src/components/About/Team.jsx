import teamList from "./teamList"
import { Member } from "./Member"

export const Team = () => (
  <>
    <h1 style={{ fontFamily: "cursive", color: "white" }}>
      Meet our team
    </h1>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    > {teamList.map((member,index) => 
      <Member member={member} index={index}/>
    )}
    </div>
  </>
)