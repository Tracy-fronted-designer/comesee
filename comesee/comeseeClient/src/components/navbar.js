import React, { Component } from 'react';
import nav from '../css/navbar.module.css'

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar fixed-top">
                <div className="container ">
                    <a href='/' className={nav.navLogo}>LOGO</a>
                    <span className={nav.navberA}>
                        <a href="/">電影首頁</a>
                        <a href="/Socialhome">社群討論</a> 
                        <a href="/Member">會員中心</a>
                        <a href="/login">登入</a>
                    </span>
                </div>
            </nav>
        );
    }
}

export default Navbar;