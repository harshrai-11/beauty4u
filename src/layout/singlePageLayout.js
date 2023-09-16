import * as React from 'react';
import { ComponentHeader } from './componentHeader';

export const SinglePageLayout = ({ layoutId, headerType, headerData, handleTabChange, activeHeaderOption, className, children }) => {
    return <div className='single-page-layout'>
        <div className={`component-page-layout-header  ${headerType}-${layoutId}`}>
            <ComponentHeader className={className} headerType={headerType} headerData={headerData} handleTabChange={handleTabChange} activeHeaderOption={activeHeaderOption}></ComponentHeader>
        </div>{children}</div>
}