import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutTopBanner from '@/components/AboutTopBanner'

describe('AboutTopBanner', () => {
    it('renders without crashing', () => {
        render(<AboutTopBanner />)
    })

    it('renders the text "The best massage experience"', () => {
        render(<AboutTopBanner />)
        const textElement = screen.getByText(/The best massage experience/i)
        expect(textElement).toBeInTheDocument()
    })
})