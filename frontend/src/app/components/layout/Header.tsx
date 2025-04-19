"use client";

import TopHeader from "./TopHeader";
import CategoryNav from "./CategoryNav";
import MainHeader from "./MainHeader";

const Header = () => {
    return (
        <header className="header">
            <div className="header-top">
                <TopHeader />
            </div>
            <div className="header-middle">
                <MainHeader />
            </div>
            <div className="header-bottom">
                <CategoryNav />
            </div>
        </header>
    );
};

export default Header;