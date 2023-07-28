import { Breadcrumbs } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ComponentHeader } from './componentHeader';

export const AppLayout = ({ layoutId, leftHeaderData, rightHeaderData, leftHeaderType, rightHeaderType, handleTabChange, leftDivChildren, rightDivChildren, activeHeaderOption, showBreadCrumb = true }) => {
    return <div className='component-root-layout'>
        {showBreadCrumb && <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="lightgrey" to="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="white"
                to="/"
            >
                Instagram
            </Link>
        </Breadcrumbs>}
        <div className='component-page-layout'>
            {layoutId === 1 && <><div className='left-div'>
                <div className={`component-page-layout-header  ${leftHeaderType}-${layoutId}`}>
                    <ComponentHeader headerType={leftHeaderType} headerData={leftHeaderData} handleTabChange={handleTabChange} activeHeaderOption={activeHeaderOption}></ComponentHeader>
                </div>
                {leftDivChildren}
            </div>
                <div className='right-div'>
                    <div className={`component-page-layout-header  ${rightHeaderType}-${layoutId}`}>
                        <ComponentHeader headerType={rightHeaderType} headerData={rightHeaderData}></ComponentHeader>
                    </div>
                    {rightDivChildren}
                </div>
            </>
            }
        </div>
        {layoutId === 2 && <div className='single-page-layout'>
            <div className={`component-page-layout-header  ${leftHeaderType}-${layoutId}`}>
                <ComponentHeader headerType={leftHeaderType} headerData={leftHeaderData} handleTabChange={handleTabChange} activeHeaderOption={activeHeaderOption}></ComponentHeader>
            </div>{leftDivChildren}</div>}
    </div>
}