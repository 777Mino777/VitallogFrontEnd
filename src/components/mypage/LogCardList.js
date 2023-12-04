import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import LogCard from './LogCard';
import { useEffect } from 'react';
import LogAddCard from './LogAddCard';

const LogCardList = ({ data }) => {
    console.log(data)
    const createItems = () =>{
        let item = data.map((log) => {
            return <LogCard seq={log.seq} exer={log.exercise} time={log.exerTime} kcal={log.kcal} date={log.exerDate} />
        })
        
        const addCardNum = 4-item.length;
        for(let i=0;i<addCardNum;i++){
            item.push(<LogAddCard exer={"운동"} time={"2"} kcal={"2"} date={"ㅇ"} />)
        }
            
       
        return item;
        
    }

    const responsive = {
        0: { items: 1 },
        768 : { items: 2 },
        1024: { items: 4 },
    };

    return (
        <div className='lg:w-[1200px]  overflow-auto items-center flex '>
            <AliceCarousel
                mouseTracking
                items={createItems()}
                responsive={responsive}
                controlsStrategy="alternate"
            />

        </div>

    )
}

export default LogCardList
