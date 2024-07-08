import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Chart,ArcElement,Tooltip,Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "../Style/resultPage.css";

Chart.register(ArcElement,Tooltip,Legend);

function ResultPage(){
    const navigate=useNavigate();
    const user=useSelector(store=>store.auth.user);
    const correctAnswer=useSelector(store=>store.data.correct_answer);
    const scribbledNote=useSelector(store=>store.data.scribbled_note);
    const missedQuestion=useSelector(store=>store.data.missed_question);
    const wrongAnswer=useSelector(store=>store.data.wrong_answer);
    const timeTaken=useSelector(store=>store.data.time_taken);
    const score=correctAnswer*10; // each correct answer is rewarded with 10 points.
    const total_score=100;
    const percentage=(score/total_score)*100;

    useEffect(()=>{
      if(user===0){
        navigate('/');
      }
    },[ ])

    //format time in MM:SS
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    //chart details 
    const data = {
        labels: ['Correct Answer', 'Wrong Answer', 'Missed Question'],
        datasets: [
          {
            label: 'Results',
            data: [correctAnswer, wrongAnswer, missedQuestion],
            backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
            hoverBackgroundColor: ['#66bb6a', '#ef5350', '#ffb74d'],
          },
        ],
      };
    
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    useEffect(() => {
      const handlePopstate = (event) => {
        window.history.pushState(null, null, window.top.location.pathname + window.top.location.search);
      };
      window.history.pushState(null, null, window.top.location.pathname + window.top.location.search);
      
      window.addEventListener('popstate', handlePopstate);

      return () => {
        window.removeEventListener('popstate', handlePopstate);
      };
    }, []);
    
    // function to handle exit button
    const handleExit=()=>{
        navigate('/'); // upon clicking exit button, the page is redirect to login page.
      };

    return(
      <>
      <Header/>
        <div className="results-page">
            <div className="summary">
                <div className="score">
                    <h2>Score: {score} / {total_score}</h2>
                    <h5>Time Taken:{formatTime(timeTaken)}</h5>
                    <h3>{percentage}%</h3>
                    <h2>Total Score</h2>
                </div>
                <div className="chart-container">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
            <div className="scribble-notes">
                <h4>Your scribble notes:</h4>
                <textarea className="scribble">{scribbledNote}</textarea>
            </div>
            <button className="btn btn-outline-danger" onClick={handleExit}>Exit</button>  
      </div>
    <Footer/>
    </>
    );
};

export default ResultPage;