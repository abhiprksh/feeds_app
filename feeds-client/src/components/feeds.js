import React,{useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import moment from 'moment'

function Feeds(){

    const [feedList, setFeedList] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const observerRef = useRef()

    const getData = useCallback(async () => {
        const resp = await axios.get("http://localhost:8000/feeds/" + pageNum)
        if(resp.data.nodes?.length) {
            setFeedList(feeds => [...feeds, ...resp.data.nodes])
            setPageNum(num => num + 1)
        }else{
            if (observerRef.current) observerRef.current.disconnect();
        }
    },[pageNum])

    useEffect(()=>{
        getData()
    },[])

    const refFunct = useCallback((e) => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              console.log(entries[0].target);
              getData();
            }
          }
        );
        if (e) observerRef.current.observe(e);
        console.log(e);
      },[feedList]);

    return (
    <div className='feed-container'>
        {feedList.map((feed, index) => {
            if (index === feedList.length - 1)
                return <FeedRow ref={refFunct} data={feed.node} key={index}/>
            else return <FeedRow data={feed.node} key={index}/>
        })}
    </div>
  )
}

const FeedRow = React.forwardRef(({data}, ref) => {
    return <div className='feed-row' ref={ref}>
        <img src={data.field_photo_image_section} className='feed-image'/>
        <div className='feed-text'>
            <span className='feed-title'>{data.title}</span>
            <span className='feed-date'>{moment(data.last_update*1000).format('MMM DD, YYYY HH:mm A')}</span>
        </div>
    </div>
})

export default Feeds