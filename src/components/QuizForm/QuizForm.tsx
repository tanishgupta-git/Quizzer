import React,{useState} from 'react'
import { Form,Button,Container,Row,Col } from 'react-bootstrap'


type Props = {
  setQuizUrl : React.Dispatch<React.SetStateAction<string>>,
  setUserDetail: React.Dispatch<React.SetStateAction<{name:string,time:number}>>
}

const QuizForm:React.FC<Props> = ({setQuizUrl,setUserDetail}) => {
    const [name,setName] = useState("");
    const [category,setCategory] = useState("any");
    const [level,setLevel] = useState("any");
    const [type,setType] = useState("any");
    const [total,setTotal] = useState("5");

    const handleSubmit = (e:React.SyntheticEvent) => {
      e.preventDefault();
      if(!name) {
          alert("Please Enter Your Name");
          return;
      }
      setUserDetail({
            name,
            time:Number(total)
        });
      let url : string = `https://opentdb.com/api.php?amount=${total}`;
      if (category !== 'any') {
          url = url + `&category=${category}`;
      }
      if(level !== 'any' ){
        url = url + `&difficulty=${level}`;
      }
      if( type !== 'any') {
          url = url + `&type=${type}`;
      }
      setQuizUrl(url);
    }

    return (
        <Container>
            <Row className="justify-content-center my-4">
                <Col lg={6} md={8}>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Smith" value={name}  onChange={(e:React.ChangeEvent<HTMLInputElement>):void => {  setName(e.target.value);}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select aria-label="Default select example" value={category} onChange={(e:React.ChangeEvent<HTMLSelectElement>):void => { setCategory(e.target.value)}}>
                                <option value="any">Any Category</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                <option value="14">Entertainment: Television</option>
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option>
                                <option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">Entertainment: Comics</option>
                                <option value="30">Science: Gadgets</option>
                                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                <option value="32">Entertainment: Cartoon &amp; Animations</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDifficulty">
                            <Form.Label>Select Difficulty</Form.Label>
                            <Form.Select aria-label="Default select example" value={level} onChange={(e:React.ChangeEvent<HTMLSelectElement>):void => { setLevel(e.target.value)}}>
                                <option value="any">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicType">
                            <Form.Label>Select Type</Form.Label>
                            <Form.Select aria-label="Default select example" value={type} onChange={(e:React.ChangeEvent<HTMLSelectElement>):void => { setType(e.target.value)}}>
                                <option value="any">Any Type</option>
                                <option value="multiple">Multiple Choice</option>
                                <option value="boolean">True / False</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuestions">
                            <Form.Label>Select Number Of Questions</Form.Label>
                            <Form.Select aria-label="Default select example" value={total} onChange={(e:React.ChangeEvent<HTMLSelectElement>):void => { setTotal(e.target.value)}}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </Form.Select>
                        </Form.Group>   

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Start Quiz
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default QuizForm
