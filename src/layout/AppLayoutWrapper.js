import * as React from 'react';
import { SinglePageLayout } from './singlePageLayout';

export const AppLayoutWrapper = ({ children, layoutId, headerData, headerType, activeHeaderOption, handleTabChange }) => {
    return layoutId === 2 && <SinglePageLayout children={children} layoutId={layoutId} headerData={headerData} headerType={headerType} activeHeaderOption={activeHeaderOption} handleTabChange={handleTabChange}></SinglePageLayout>
}