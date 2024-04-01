
import AboutBody from '@/components/AboutBody'
import React from 'react'
import AboutMidBanner from '@/components/AboutMidBanner'
import AboutTopBanner from '@/components/AboutTopBanner'
import AboutTeam from '@/components/AboutTeam'

function AboutPage() {
  return (
    <div>
        <AboutTopBanner />
        <AboutBody />
        <AboutMidBanner />
        <AboutTeam />
    </div>
  )
}

export default AboutPage