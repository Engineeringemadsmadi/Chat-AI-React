import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faLightbulb, faMessage, faCode, faMicrophone, faImage, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import './main.css';
import './header.css';
import { useContext } from 'react';
import { Context } from '../context/Context';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    return (
        <div className="main">
            <nav className='nav'>
                <p className='brand'>Chat AI</p>
                <img src={require("../images/profile.png")} alt="profile" className='profile-icon' />
            </nav>
            <div className="main-container">
                {!showResult
                    ? <>
                        <h1 className='var-m'>Hello, Emad.</h1>
                        <h1 className='mt-2'>I nice you came , How can I help you today?</h1>
                        <div className="cards var-m">
                            <div className="card-item">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <FontAwesomeIcon icon={faCompass} className='icon' />
                            </div>
                            <div className="card-item">                        <p>Briefly summarize this concept: urban planning</p>
                                <FontAwesomeIcon icon={faLightbulb} className='icon' />
                            </div>
                            <div className="card-item">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <FontAwesomeIcon icon={faMessage} className='icon' />
                            </div>
                            <div className="card-item">
                                <p>Improve the readability of the following code</p>
                                <FontAwesomeIcon icon={faCode} className='icon' />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={require("../images/profile.png")} alt="profile" className='img-profile' />
                            <p className='par-qustion'>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={require("../images/chatAI-icon.png")} alt="chatAI icon" className="chatai-icon" />
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }} className='par-result'></p>
                            }
                        </div>
                    </div>
                }
                <div className="area-prompt">
                    <div className="search-box">
                        {/*  Controlled input filed */}
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='search' name='search'
                            placeholder='Enter a prompt here' />
                        <div>
                            <FontAwesomeIcon icon={faMicrophone} className='icon-search' />
                            <FontAwesomeIcon icon={faImage} className='icon-search' />
                            <FontAwesomeIcon onClick={() => onSent()} icon={faPaperPlane} className='icon-search' />
                        </div>
                    </div>
                    <p className='bottom-info'>AI Chat may display inaccurate info, including about people, so double-check is responses. Your privacy and Gems Apps .</p>
                </div>
            </div>
        </div>
    );
}
export default Main;