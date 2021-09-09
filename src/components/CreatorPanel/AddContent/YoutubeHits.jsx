const YoutubeHits = ({yTHits, autoFill}) => (
  <div style={{ border: "solid blue", borderRadius: "5px", padding: "5px", marginBottom: "25px" }}>
    <h5>Select a video</h5>
    {yTHits.map((hit, hitIndex) => {
      return (
        <p onClick={() => autoFill(hitIndex)} style={{ cursor: "pointer" }}>
          {hit.snippet.title}
        </p>
      )
    })}
  </div>
)

export default YoutubeHits