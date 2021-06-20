import '../App.css'
import VideoPreview from './VideoPreview'

const Previews = ({ videos }) => {

  console.log(videos)
  return (
    <div className="previews">
      {
        videos && videos.map((video, index) => {
          return <VideoPreview video={video} index={index} />
        })
      }
    </div>
  )
}

export default Previews
