import React,{useState,useEffect, useRef} from 'react'
import { Button,Form,Container,Row,Col,Badge } from 'react-bootstrap';
import he from 'he';
import ShuffleQuestions from '../../utils/ShuffleQuestion';
import Timer from '../../utils/Timer';
import Loader from '../Loader/Loader';

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
  incorrect_answers: string[],
  options: string[],
  question : string,
  type : string
}

interface TimeI {
  minutes : number,
  seconds : number,
}

const Quiz: React.FC<Props> = ({quizUrl,userDetail}) =>  {
    const [time,setTime] = useState<TimeI>({minutes:userDetail.time,seconds:0});
    const [loading,setLoading] = useState(false);
    const [questions,setQuestions] = useState<QuestionI[]>([] as QuestionI[]);
    const [currQuestion,setCurrQuestion] = useState(0);
    const [answer,setAnswer] = useState("");
    const [score,setScore] = useState(0);
    const timerRef = useRef< NodeJS.Timeout>(null as unknown as NodeJS.Timeout);

    useEffect(() => {
      setLoading(true);
      fetch(quizUrl).then(res => res.json())
      .then((data) => { 
          setQuestions(data.results.map((result:QuestionI) => ({...result,options:ShuffleQuestions([result.correct_answer,...result.incorrect_answers])})));
          setLoading(false);
          timerRef.current  = Timer(setTime);
      })

      return () => clearInterval(timerRef.current);
    },[quizUrl])
  
    const handleClick = () => {
      if (currQuestion + 1 === questions.length) {
        clearInterval(timerRef.current);
        alert(`Your Score Is ${score}`);
        return;
      }
      if( answer === he.decode(questions[currQuestion].correct_answer)) {
        setScore(prev => prev + 1);
      }
      setCurrQuestion(prev => prev + 1);    
    }

    const handleChange = (clickedAnswer:string) => {
        setAnswer(clickedAnswer);
    }
    return (
        loading ? <Loader /> :         
        <Container>
          <Row className="justify-content-center my-3">
            <Col lg={8} md={8}>
                  <div className='d-flex justify-content-end'>
                    <Badge bg="secondary p-3">{time.minutes}:{time.seconds}</Badge>
                  </div>
                  {questions.length && 
                  <div>
                    <p>{currQuestion + 1} / {questions.length}</p>
                    <div>
                        <p>{he.decode(questions[currQuestion].question)}</p>
                          <div>
                            {
                                questions[currQuestion].options.map
                                (
                                    (item,index) => (
                                      <Form.Check 
                                      key={`${currQuestion}${index}Q`}
                                      type='radio'
                                      id={`${currQuestion}${index}Q`}
                                      label={he.decode(item)}
                                      name={`${currQuestion}Q`}
                                      onChange={() => handleChange(he.decode(item))}
                                    />
                                    )
                                )
                            }
                            </div>
                          <div className='d-flex justify-content-end mt-3' >
                            <Button onClick={handleClick}>{ currQuestion === questions.length ? 'Finish' : 'Next' }</Button>
                          </div>

                    </div>
                  </div>
            }
          </Col>
      </Row>
    </Container>          
    )
}

export default Quiz;