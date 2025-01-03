import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../../assets/imgs/logo-light.png"
const Sidebar = () => {
    const menuItems = [
        ["Home", "/"],
        ["Services", "/services"],
        ["About", "/about"],
        ["Pricing", "/pricing"],
        ["Contact","/contact"],
        ["Career","/career"],
    ];

    return (
        <div className="hamenu one-scroll">
            <div className="logo icon-img-250">
                <img className="" src='/assets/imgs/logo-light.png' alt="" />
            </div>
            <div className="close-menu cursor-pointer ti-close"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="menu-text">
                            <div className="text">
                                <h2>Menu</h2>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <div className="col-lg-7">
                        <div className="menu-links">
                            <ul className="main-menu rest">
                                {menuItems.map((item, index) => (
                                    <li key={index} data-scroll-nav={index}>
                                        <div className="o-hidden">
                                            <Link to={item[1]} className="link cursor-pointer dmenu">
                                                <span className="fill-text" data-text={item[0]}>
                                                    {item[0]}
                                                </span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-lg-3">
                        <div className="cont-info">
                            <div className="item mb-50">
                                <h6 className="sub-title mb-15 opacity-7">Address</h6>
                                <h5>
                                Metro Manila,
                                    <br /> Philippines
                                </h5>
                            </div>
                            <div className="item mb-50">
                                <h6 className="sub-title mb-15 opacity-7">Social Media</h6>
                                <ul className="rest social-text">
                                    {[["Facebook","https://www.facebook.com/people/Sofreg-Solutions/61567081641563/"], ["WhatsApp","tel:+639177070531"], ["LinkedIn","https://www.linkedin.com/company/sofreg-solutions/"], ["Email", "mailto:info@sofregsolutions.com"]].map(
                                        (social, index) => (
                                            <li className="mb-10" key={index}>
                                                <a href={social[1]} className="hover-this">
                                                    <span className="hover-anim">{social[0]}</span>
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="item mb-40">
                                <h6 className="sub-title mb-15 opacity-7">Contact Us</h6>
                                <h5>
                                    <a href="#0">info@sofregsolutions.com</a>
                                </h5>
                                <h5 className="underline mt-10">
                                    {/* <a href="#0">+1 840 841 25 69</a> */}
                                    <a href="#0">+639177070531</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
