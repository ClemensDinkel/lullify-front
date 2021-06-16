import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../App.css'


const Previews = ({videos}) => {

    console.log(videos)
    return (
        <>
            
            {
                videos && videos.map((video, index) => {
                    return <div className='player-page'>
                    <Card key={index} bg='light'style={{ width: '18rem' }} >
<Card.Header>Header</Card.Header>
<Card.Body>
<Card.Title> 
   <Link to={`/player/${video._id}`}>
       {video.title}
   </Link>
</Card.Title>
<Card.Text>
{video.title}
</Card.Text>
</Card.Body>
</Card>
              </div>
                })
            }
        </>
    )
}

export default Previews