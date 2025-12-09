import React from 'react'
import { GridBackground } from '@/app/Components/Reusables/GridBackground'

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
            {/* Background layer - starts below navbar, fixed and non-interactive */}
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full pointer-events-none z-0">
                <GridBackground />
            </div>
            {/* Content layer - fully interactive */}
            <div className="relative z-10 min-h-screen w-full">
                {children}
            </div>
        </>
    )
}
export default layout