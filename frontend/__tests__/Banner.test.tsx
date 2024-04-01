import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Banner from '@/components/Banner'

describe('Banner', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear()
    })

    it('renders without crashing', () => {
        render(<Banner />)
    })

    // testing failed
    it('displays the correct background image', () => {
        render(<Banner />)
        const heroSection = screen.getByTestId('hero-section')
        expect(heroSection).toHaveStyle('backgroundImage: url(/img/banner1.jpg)')
    })

    it('displays the correct heading and description', () => {
        render(<Banner />)
        const headingElement = screen.getByRole('heading', { level: 1 })
        expect(headingElement).toHaveTextContent('Massage Reservation')

        const descriptionElement = screen.getByText(/Discover popular massage spots/i)
        expect(descriptionElement).toBeInTheDocument()
    })

    it('displays sign up and sign in buttons when not logged in', () => {
        render(<Banner />)
        const signUpButton = screen.getByRole('link', { name: /sign up/i })
        const signInButton = screen.getByRole('link', { name: /sign in/i })

        expect(signUpButton).toBeInTheDocument()
        expect(signInButton).toBeInTheDocument()
    })

    it('does not display sign up and sign in buttons when logged in', async () => {
        // Set a dummy token in localStorage to simulate logged in state
        localStorage.setItem('token', 'dummy_token')

        render(<Banner />)

        const signUpButton = screen.queryByRole('link', { name: /sign up/i })
        const signInButton = screen.queryByRole('link', { name: /sign in/i })

        expect(signUpButton).not.toBeInTheDocument()
        expect(signInButton).not.toBeInTheDocument()
    })
})
