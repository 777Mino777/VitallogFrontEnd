import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
  } from "chart.js";
import { Line } from "react-chartjs-2";
const LogChart = ({caption, logData }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    
      );
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text : `${caption}`,
          },
        },
      };

      const logChart = logData ?
      <Line
        datasetIdKey="id"
        options={options}
        data={{
          labels: logData.map((data) => data.exerDate),
          datasets: [
            {
              id: 1,
              type: 'bar',
              label: '운동시간(min)',
              data: logData.map(data => data.totalExerTime),
              backgroundColor: '#00C3CA',
  
            },
            {
              id: 2,
              type: 'line',
              label: '에너지(kcal)',
              data: logData.map(data => data.totalKcal),
              borderColor: "#0085C9",
              backgroundColor: '#E6F4F1',
  
            },
          ],
        }}
        onClick={e =>{
          
          console.log(e.target);
  
        }}
        
      />
      : null;

    return (
        <div className="w-[1200px]">
            {logData && logChart}
        </div>
    )
}

export default LogChart
