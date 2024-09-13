import React, { useCallback, useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Sidebar = () => {
    const [extendted, setextented] = useState(false)

    const { onSent, previousprompt, setrecentprompt, newchat } = useContext(Context);
    const loadprompt = async (prompt) => {
        setrecentprompt(prompt)
        await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} onClick={() => setextented(!extendted)} alt="" />
                <div onClick={() => s = newchat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extendted ? <p>New Chat</p> : null}
                </div>
                {extendted ? <div className="recent">
                    <p className="recent-title">Recent</p>
                    {
                        previousprompt.map((item, indx) => {
                            return (<div onClick={() => loadprompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}..</p>

                            </div>)
                        })
                    }

                </div> : null}

            </div>
            <div className="bottom ">
                <div className="bottom-item recent-entry ">
                    <img src={assets.question_icon} alt="" />
                    {extendted ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.history_icon} alt="" />
                    {extendted ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.setting_icon} alt="" />
                    {extendted ? <p>Setting</p> : null}
                </div>

            </div>

        </div>
    )
}

export default Sidebar
