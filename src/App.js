import { faThumbsDown as faThumbsDownOutlined, faThumbsUp as faThumbsUpOutlined } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane, faThumbsDown as faThumbsDownSolid, faThumbsUp as faThumbsUpSolid, faTimes, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './App.css';
import logo from './icons/logo.png';


function App() {
  
  const translate = async(text, toSpanish) => {

    let fromLang = toSpanish ? 'en' : 'es';
    let toLang = toSpanish ? 'es' : 'en';
    const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    let response = await fetch(url, { 
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    return response.json();
  }

  const [isEnglish, setIsEnglish] = useState(true);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

    useEffect(() => {
      scrollToBottom()
      console.log(messages)
    }, [messages]);


  const handleClick = async() => {
    let englishMessage = "";
    let spanishMessage = "";
    if(isEnglish){
      englishMessage = text;
      let translation = await translate(text, true)
      spanishMessage = translation.data.translations[0].translatedText;
    }
    else {
      spanishMessage = text;
      let translation = await translate(text, false)
      englishMessage = translation.data.translations[0].translatedText;
    }
    let index = messages.length;
    setMessages([
    ...messages,
    {
      key: index,
      reaction: "none",
      isEnglish: isEnglish,
      englishMessage: englishMessage,
      spanishMessage: spanishMessage
    }])
    setText("");
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const switchLanguage = async () => {
    if(isEnglish){
      setIsEnglish(false)
    }
    else{
      setIsEnglish(true)
    }
  }

  const addReaction = (index, react) => {
    if(react === "thumbs-up"){
      messages[index].reaction = "thumbs-up"
      console.log(messages[index]);
    }
    else{
      messages[index].reaction = "thumbs-down"
    }
    setMessages([...messages])
  }

  const removeReaction = (index, english) => {
    if((english && isEnglish) || (!english && !isEnglish)){
      return;
    }
    messages[index].reaction = "none"
    setMessages([...messages])
  }
  

  return (
    <div className="App">
      <Row className="App-header">
        <h1 className="App-title">GatorCom</h1>
        <img className="App-logo" src={logo} alt="Text Bubble"/>
      </Row>
      <div className="App-subheader">
        <h2 className="App-subheader-text">{isEnglish ? "Start A Conversation" : "Iniciar Una Conversación"}</h2>
        {isEnglish ? 
          <div dangerouslySetInnerHTML={{__html: '<h2>Supports fluid interactions between <b>Spanish</b> and <b>English</b> speakers</h2>'}}/>
          : <div dangerouslySetInnerHTML={{__html: '<h2>Admite interacciones fluidas entre hablantes de <b>Español</b> e <b>Inglés</b></h2>'}}/>
        }
        <button className={isEnglish ? "App-subheader-switchbutton-english" : "App-subheader-switchbutton-spanish"} onClick={switchLanguage}>
          {isEnglish ? <>
          <div><b>Switch To Spanish User</b></div>
          <div><b>Cambiar Al Usario Español</b></div></> :
          <><div><b>Cambiar Al Usuario Inglés</b></div>
          <div><b>Switch To English User</b></div></>}     
        </button>
      </div>
      <div className="App-chatbox">
        <div className="App-chatbox-card">
        <div className="justify-right">
          <button className="App-exitbutton">
              <div className="App-exitbutton-group">
              <FontAwesomeIcon icon={faTimes} />
              {isEnglish ? <div className="App-exitbutton-label"><b>End</b></div> : <div className="App-exitbutton-label"><b>Fin</b></div>}
              </div>
          </button>
        </div>
        <div className="App-message-box">
          {messages.map(message => (
            <Row className="App-message-group" key={message.key} >
              <Col xs={1.5}>
                {message.isEnglish ? <div>{isEnglish ? <div className="App-message-box-user-eng-1"><b>English User:</b></div> : <div className="App-message-box-user-eng"><b>Usuario Inglés:</b></div>}</div> 
                : <div>{isEnglish ? <div className="App-message-box-user-span-1"><b>Spanish User:</b></div> : <div className="App-message-box-user-span"><b>Usario Español:</b></div>}</div>}
              </Col>
              <Col xs={8} className="App-message-box-yuh">
                {isEnglish ? message.englishMessage : message.spanishMessage}
              </Col>
              <Col className="App-message-rating">
                {message.reaction === "none" ?
                <>{((isEnglish && !message.isEnglish) || (!isEnglish && message.isEnglish)) ? <>
                    <FontAwesomeIcon icon={faThumbsUpOutlined} className="icon" onClick={() => {addReaction(message.key, "thumbs-up")}}/>
                    <FontAwesomeIcon icon={faThumbsDownOutlined} className="icon" onClick={() => {addReaction(message.key, "thumbs-down")}}/>
                  </> : <></>}</>
                : <>{message.reaction === "thumbs-up" ? 
                <>
                <FontAwesomeIcon icon={faThumbsUpSolid} className={`reaction ${message.isEnglish ? 'english' : 'spanish'}`}/> 
                {((isEnglish && !message.isEnglish) || (!isEnglish && message.isEnglish)) ? <FontAwesomeIcon className="icon" icon={faUndoAlt} onClick={() => {removeReaction(message.key, message.isEnglish)}}/> : <></>}
                </>
                : <><FontAwesomeIcon icon={faThumbsDownSolid} className={`reaction ${message.isEnglish ? 'english' : 'spanish'}`}/> 
                {((isEnglish && !message.isEnglish) || (!isEnglish && message.isEnglish)) ? <FontAwesomeIcon className="icon" icon={faUndoAlt} onClick={() => {removeReaction(message.key, message.isEnglish)}}/> : <></>}
                </>
                }</>
                }
              </Col>
            </Row>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Textbox for sending messages */}
          <Row className="App-textbox">
            <Col md={11}>
          <Form onSubmit={(e) => {e.preventDefault()}}>
            <Form.Group controlId="formMessage">
            <Form.Control type="text" onChange={handleChange} value={text} autoComplete="off"/>
          </Form.Group>
          </Form>
          </Col>
          <button className={isEnglish ? "App-textbox-button-eng" : "App-textbox-button-span"} type="button" onClick={handleClick}>
            <FontAwesomeIcon icon={faPaperPlane}/>
          </button>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App;

//onClick={() => {removeReaction(message.key, message.isEnglish)}}