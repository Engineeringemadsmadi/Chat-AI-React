import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMessage, faQuestion, faGear, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { useContext, useRef, useState } from 'react';
import { Context } from '../context/Context';

const Sidebar = () => {
    //const [onSent, prevPrompts, setRecentPrompt] = useContext(Context);

    const {
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        setInput,
        onSent,
        newChat,
    } = useContext(Context);

    // يتم عرض قائمة من العناصر المستخرجة من prevPrompts،
    //  حيث يقوم كل عنصر باستدعاء loadPrompt عند النقر عليه.
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    const hidden = useRef(null);
    const [navbarStyle, setNavbarStyle] = useState({ className: '' });
    const [itemHidden, setItemhidden] = useState({ className: 'hidden' });

    const handleClickCollapsed = () => {
        setNavbarStyle(prevState => {
            const newClassName = prevState.className.includes('edit-navbar')
                ? prevState.className.replace('edit-navbar', '').trim()
                : prevState.className = "edit-navbar";

            return {
                ...prevState,
                className: newClassName
            };
        });
        setItemhidden(prevState => {
            const newClassName = prevState.className.includes('hidden')
                ? prevState.className.replace('hidden', '').trim()
                : prevState.className = "hidden";
            return {
                ...prevState,
                className: newClassName
            };
        });
    };

    return (
        <div className="sidebar-m">
            <Navbar variant="dark" bg="dark" expand="xxl" className={navbarStyle.className}>
                <Container className='flex-column'>
                    <Navbar.Toggle aria-controls="navbar-dark" onClick={handleClickCollapsed} />

                    <FontAwesomeIcon icon={faPlus} className='plus-icon' onClick={() => newChat()} />
                    <p className={`${itemHidden.className} text-chat`} ref={hidden}>New Chat</p>

                    <div className={`${itemHidden.className} recent`} ref={hidden}>
                        <p className={`${itemHidden.className} recent-title`} ref={hidden}>Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry" ref={hidden}>
                                    <FontAwesomeIcon icon={faMessage} className={`${itemHidden.className} message-icon`} />
                                    <p className={`${itemHidden.className} text-chat`} ref={hidden}>{item/*.slice(0,18)*/}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bottom-parent">
                        <div className="bottom">
                            <div className="bottom-item recent-entry">
                                <FontAwesomeIcon icon={faQuestion} className='question-icon' />
                                <p className={itemHidden.className} ref={hidden} id='pargraph-1'>Help</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="bottom-item recent-entry">
                                <FontAwesomeIcon icon={faGear} className='gear-icon' />
                                <p className={itemHidden.className} ref={hidden}>Activity</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="bottom-item recent-entry">
                                <FontAwesomeIcon icon={faClockRotateLeft} className='clock-rotate-left-icon' />
                                <p className={itemHidden.className} ref={hidden}>Setting</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

export default Sidebar;
