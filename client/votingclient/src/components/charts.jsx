import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ffcontext } from '../context/ffcontext';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Charts() {
 let data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const{ff,setff}=useContext(ffcontext);
  function getRandomRGBA(alpha = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if(Array.isArray(ff)){
    let names = ff.map(([name, vote]) => name);
    let voteCounts = ff.map(([name,vote]) => parseInt(vote._hex,16));
    let colors=ff.map((index)=>getRandomRGBA());
    data = {
      labels: names,
      datasets: [
        {
          label: '# of Votes',
          data: voteCounts,
          backgroundColor:colors,
          borderColor:colors,
          borderWidth: 1,
        },
      ],
    };
  }

  return <Pie data={data} />;
}
// export default function Charts() {
//   const { ff } = useContext(ffcontext);
//   ChartJS.register(ArcElement, Tooltip, Legend);
//   let names = [];
//   let voteCounts = [];

//   if (Array.isArray(ff)) {
//     names = ff.map(([name, vote]) => name);
//     voteCounts = ff.map(([name, vote]) => parseInt(vote._hex, 16));
//   }

//   const data = {
//     labels: names,
//     datasets: [
//       {
//         label: '# of Votes',
//         data: voteCounts,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };
// console.log(data)
//   return( 
//     <>
//     {/* {(Array.isArray(ff))?<Pie data={data} />:<p>loading</p>} */}
//   <Pie data={data}/>
//   </>
//   );
// }
