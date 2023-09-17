import * as React from 'react';
import Button from '@mui/material/Button';

export const ComponentHeader = ({ headerType, headerData, handleTabChange, activeHeaderOption, className }) => {

    const goToRoute = (path) => {
        if (path) {
            window.location.href = `/${path}`
        }
    }

    return (headerType === 'navigation' ?
        headerData.map((val, index) => {
            return <span key={index} className={`header-option ${activeHeaderOption === val ? 'active' : ''}`} onClick={(e) => handleTabChange(e)}>{val}</span>
        }) :
        headerType === 'username-display' ?
            <><img src='https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces' alt='user'></img>
                <div>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{headerData.name}</span>
                    <div className='social-media-username'>{headerData.socialMediaUsername}</div>
                </div></> : headerType === 'button-layout' ?
                <div className={`button-layout ${className}`}>
                    <div className={`button-layout-heading`}>{headerData.heading}</div>
                    <div className='buttons-div'>{headerData.buttons.map((val, index) => {
                        return <Button key={index} variant={val.variant} onClick={() => goToRoute(val.path)}>{val.buttonLabel}</Button>
                    })}</div>
                </div> : null
    )
}