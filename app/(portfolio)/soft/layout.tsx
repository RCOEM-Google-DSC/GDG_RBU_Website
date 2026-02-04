import React from 'react'
import './styles.css'

export const metadata = {
    title: 'Developer Portfolio',
    description: 'Full Stack & ML Enthusiast',
}

const SoftPortfolioLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
            {children}
        </div>
    )
}
export default SoftPortfolioLayout
