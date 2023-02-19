import React,{useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'

function Feeds(){

    const [feedList, setFeedList] = useState([])

    const getData = async () => {
        const resp = await axios.get("http://localhost:8000/feeds/1")
        if(resp.data.nodes) {
            setFeedList(resp.data.nodes)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return (
    <div className='feed-container'>
        {feedList.map((feed, index) => <FeedRow data={feed.node} key={index}/>)}
    </div>
  )
}

const FeedRow = ({data}) => {
    return <div className='feed-row'>
        <img src={data.field_photo_image_section} className='feed-image'/>
        <div className='feed-text'>
            <span className='feed-title'>{data.title}</span>
            <span className='feed-date'>{moment(data.last_update*1000).format('MMM DD, YYYY HH:mm A')}</span>
        </div>
    </div>
}

export default Feeds