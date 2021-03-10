import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import './App.css';
import logo from './icons/logo.png';


function App() {
  return (
    <div className="App">
      <Row className="App-header">
        <h1 className="App-title">GatorCom</h1>
        <img className="App-logo" src={logo} alt="Text Bubble"/>
      </Row>
      <div className="App-subheader">
        <h2 className="App-subheader-text">{true ? "Start A Conversation" : "Iniciar Una Conversación"}</h2>
        {true ? 
          <div dangerouslySetInnerHTML={{__html: '<h2>Supports fluid interactions between <b>Spanish</b> and <b>English</b> speakers</h2>'}}/>
          : <div dangerouslySetInnerHTML={{__html: '<h2>Admite interacciones fluidas entre hablantes de <b>Español</b> e <b>Inglés</b></h2>'}}/>
        }
        <Button className={true ? "App-subheader-switchbutton-english" : "App-subheader-switchbutton-spanish"}>
          {true ? <>
          <div><b>Switch To Spanish User</b></div>
          <div><b>Cambiar Al Usario Español</b></div></> :
          <><div><b>Cambiar Al Usuario Inglés</b></div>
          <div><b>Switch To English User</b></div></>}     
        </Button>
      </div>
      <div className="App-chatbox">
          <div className="App-chatbox-card">
            <div className="test">
              <button className="App-exitbutton">
                  <div className="App-exitbutton-group">
                  <FontAwesomeIcon icon={faTimes} />
                  {true ? <div className="App-exitbutton-label"><b>End</b></div> : <div className="App-exitbutton-label"><b>Fin</b></div>}
                  </div>
              </button>
            </div>
          </div>
      </div>

    </div>
  );
}

export default App;
