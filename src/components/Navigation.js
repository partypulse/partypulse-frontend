import React, { useState } from 'react';
import SideMenu from "./SideMenu";

const Navigation = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    return (
        <div>
            {/* IconButton för att öppna sidomenyn */}
            {/* Implementera sidomenyn */}
            <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
        </div>
    );
};

export default Navigation;
