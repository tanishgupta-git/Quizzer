import React,{useState,useEffect} from 'react'
import { Button,Form } from 'react-bootstrap';


type Props = {
  quizUrl : string,
  userDetail : {
      name : string,
      time : number
  }
}

interface QuestionI {
  category : string,
  correct_answer : string,
  difficulty : string,
  incorrect_answers : string[],
  question : string,
  type : string
}

interface TimeI {
  minutes : number,
  seconds : number,
}

const Quiz: React.FC<Props> = ({quizUrl,userDetail}) =>  {
    const [time,setTime] = useState<TimeI>({minutes:1,seconds:0});
    const [questions,setQuestions] = useState<QuestionI[]>([] as QuestionI[]);
    const [currQuestion,setCurrQuestion] = useState(1);
    const [score,setScore] = useState(0);

    useEffect(() => {
      fetch(quizUrl).then(res => res.json())
      .then((data) => {
          setQuestions(data.results);
          console.log(data.results)
        //   Ticker();
      })
    },[quizUrl])

    const Ticker = () => {
     var returnId = setInterval(() => {
         let min,sec;
          setTime( (prev) => {
              min = prev.minutes;
              sec = prev.seconds;

              if(sec === 0) {
                  min = prev.minutes - 1;
                  sec = 60;
              }
              sec = sec - 1;
              return ({ minutes:min,seconds:sec})
          })
          if (min === 0 && sec === 0) {
            clearInterval(returnId)
            alert("Test is Over");
         }
      },1000) ;

    }
  
    const handleClick = () => {


    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.id);
    }
    return (
        <div>
            <p>{time.minutes}:{time.seconds}</p>
            {questions.length && 
             <div>
               <p>{currQuestion} / {questions.length}</p>
               <div>
                   <p>{questions[currQuestion].question}</p>
                     <div>
                       {
                           [questions[currQuestion].correct_answer,...questions[currQuestion].incorrect_answers].map
                           (
                               (item,index) => (
                                <Form.Check 
                                key={index}
                                type='radio'
                                id={index.toString()}
                                label={item}
                                name={`${currQuestion}Q`}
                                onChange={handleChange}
                              />
                               )
                           )
                       }
                       </div>
                    <Button onClick={handleClick}>{ currQuestion === questions.length ? 'Finish' : 'Next' }</Button>

               </div>
            </div>
      }
        </div>
    )
}

export default Quiz;