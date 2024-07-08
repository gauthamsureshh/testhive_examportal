import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { correctAnswer,missedQuestion,wrongAnswer,scribbledNote,timeTaken } from "../Store/dataSlice";
import Header from "./header";
import Footer from "./footer";
import Modal from "./modal";
import question from "../questions.json";
import "../Style/testPage.css";


function TestPage(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const category=useSelector(store=>store.data.test_category) || 'arts';
    const [questionIndex,setQuestionIndex]=useState(0);
    const [selectedOptions,setSelectedOptions]=useState({});
    const [notes,setNotes]=useState('');
    const user= useSelector(store=>store.auth.user);
    const questions=question.filter(question=>question.category === category); //fetches the question according to the exam category selected by the user.
    const [timeLeft,setTimeLeft] = useState(300); // 5 minute timer
    const [isModalOpen,setIsModalOpen]= useState(false);

    //if user is not found, the test-page will redirected to login page
    useEffect(()=>{
      if(user===0){
        navigate('/');
      }
    },[ ])
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
    
    //function format the timer in MM:SS 
    const formatTime=(time)=>{
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    //timer countdown
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTimeLeft((prevTime)=>{
                if(prevTime <= 0){
                    handleTimeOut();
                    return 0;
                }
                else{
                    return prevTime - 1;
                }
            });
        },1000)
        return ()=>clearInterval(timer);
    },[ ]);

    const handleOptionChange = (questionIndex, option) => {
      setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
    };

    const handleSubmission=()=>{
      const missed_question=countMissedQuestions();
      const accurate_answer=countCorrectAnswer();
      const wrong_answer=questions.length - accurate_answer - missed_question;//we will get wrong answer if we subtract correct answer(accurate_answer) and missed questions.
      const time_taken=300 - timeLeft;// calculate the time taken to complete the test
      handleCloseModal();
      dispatch(correctAnswer(accurate_answer));
      dispatch(missedQuestion(missed_question));
      dispatch(wrongAnswer(wrong_answer));
      dispatch(scribbledNote(notes));
      dispatch(timeTaken(time_taken));
      navigate('/resultpage');
    };

    //fn to count the number of correct answers among all the selected options.
    const countCorrectAnswer=()=>{
      let count=0;
      questions.forEach((q,index)=>{
        const selectedOption=selectedOptions[index];
        if(selectedOption && selectedOption.id === q.correct_option){
          count++;
        }
      });
      return count;
    };

    // function count the number of missed questions
    const countMissedQuestions=()=>{
      let count=0;
      for(let i=0;i< questions.length;i++){
        if(!selectedOptions[i]){
          count++;
        }
      }
      return count;
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    //function to handle timeout
    const handleTimeOut=()=>{
      handleSubmission(); // redirect to result page when timed out
    } 

    const nextQuestion=()=>{
        if(questionIndex < questions.length - 1){
            setQuestionIndex((prevIndex)=>prevIndex + 1);
        }
        else{
          handleOpenModal();
        }
    };

    const handlePreviousQuestion = () => {
        if (questionIndex > 0 ) {
          setQuestionIndex(prevIndex=> prevIndex - 1);
        }
      };

    return(
      <>
      <Header/>
        <div className="test-page">
          <div className="timer">{formatTime(timeLeft)}</div>
            <div className="content">
              <div className="question-section">
                <h2>Question {questionIndex + 1} of {questions.length}</h2>
                <p>{questions[questionIndex].question}</p>
                <div className="options">
                  {questions[questionIndex].options.map((option, index) => (
                    <div key={index} className="option">
                      <label>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          checked={selectedOptions[questionIndex] === option}
                          onChange={() => handleOptionChange(questionIndex, option)}
                        />
                        {option.value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="notepad-section">
                <h5>Notepad</h5>
                <hr/>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Scribble your notes here..."
                />
              </div>
            </div>
            <div className="navigation-buttons">
              <button className="btn btn-outline-primary" onClick={handlePreviousQuestion} disabled={questionIndex === 0} >Previous</button>
              <button className="btn btn-outline-primary" onClick={nextQuestion}>
                {questionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
        </div>
      <Footer/>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleSubmission}
      />
    </>
  );
};

export default TestPage;