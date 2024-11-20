"use client"

import React from 'react'
import MobileNavbar from './mobile-navbar/mobile-navbar'
import DesktopNavbar from './destop-navbar/desktop-navbar'

const Navbar = () => {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    )
}

export default Navbar
