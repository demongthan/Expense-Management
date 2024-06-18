import React from 'react'
import Logo from '../Logo';
import NavbarItem from './NavbarItem';
import ThemeSwitcherBtn from './ThemeSwitcherBtn';
import { items } from '@/lib/Item';

const DesktopNavbar = () => {
    return (
    <div className="hidden border-separate border-b bg-background md:block">
        <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <Logo />
            <div className="flex h-full">
            {items.map((item) => (
                <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
                />
            ))}
            </div>
        </div>
        <div className="flex items-center gap-2">
            <ThemeSwitcherBtn />
        </div>
        </nav>
    </div>
    );
}

export default DesktopNavbar