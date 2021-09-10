import React,{useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Quiz from './components/Quiz/Quiz';
import QuizForm from './components/QuizForm/QuizForm';

type userDetailT = {
  name : string,
  time : number
}
function App() {
  const [quizUrl,setQuizUrl] = useState("");
  const [userDetail,setUserDetail] = useState<userDetailT>({} as userDetailT);

  return (
    <div className="App">
      <Header />
      { !quizUrl ? 
      <QuizForm setQuizUrl={setQuizUrl} setUserDetail={setUserDetail} />
       :
      <Quiz quizUrl={quizUrl} userDetail={userDetail} />
      }
    </div>
  );
}

export default App;