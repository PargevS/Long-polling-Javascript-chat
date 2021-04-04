import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import axios from 'axios';
import uuid from 'uuid-random';
//* import of components and developer packages
import './LP_Chat.scss';

const LpChat = () => {
    const [inputVal, setInputVal] = useState('');
    const [message, setMessage] = useState([]);

    // retrieving message content
    const inputChangeHandler = () => (e) => setInputVal(e.target.value);

    // starting a subscription to receive new messages
    useEffect(() => {
        subscribe();
    }, [])

    // sending a message to the server
    const sendMessage = async () => {
        // empty message check
        if(inputVal !== ''){
            await axios.post('http://localhost:8000/add-message', {
                message: inputVal,
                id: uuid()
            });
        }
    }

    // function to subscribe to receive new messages
    const subscribe = async  () => {
        try{
         const {data} = await axios.get('http://localhost:8000/get-message');
         setMessage(pr => [{...data}, ...pr]);
         await subscribe();
        }catch (err){
            setTimeout(() => subscribe(), 500);
        }
    }



    return (
        <div className='pl-chat'>
            <div>
                <div className="form">
                    <input type="text"
                           onInput={inputChangeHandler()}
                           value={inputVal}/>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
                <div className="messages">
                    {message.map(mess => (
                        <div className='message' key={mess.id}>{mess.message}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LpChat;