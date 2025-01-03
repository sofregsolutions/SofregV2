import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
const Loader = () => {
  const location = useLocation();
  console.log(location)
    useEffect(() => {
      // Define the keys and corresponding pages (don't include leading "/")
      const pages = ["", "services", "about", "contact", "career", "pricing"];
  
      // Get the current page without the leading "/"
      const currentPage = location.pathname.slice(1);
  
      // Initialize sessionStorage keys for each page only if they don't exist
      if (!sessionStorage.getItem(currentPage)) {
        sessionStorage.setItem(currentPage, "false");  // Default to false if not set
      }
  
      // Reset all pages to 'false' (avoid keeping previous states)
      pages.forEach((page) => {
        if (page !== currentPage){

          sessionStorage.setItem(page, "false");  // Reset all to false
        }
      });
  
      // Check if we are on a page in the list
      if (pages.includes(currentPage)) {
        if (sessionStorage.getItem(currentPage) !== "true") {
          sessionStorage.setItem(currentPage, "true");  // Mark as refreshed
          window.location.reload();  // Trigger page reload
        } 
      }
    }, [location.pathname]);  // Run the effect whenever the pathname changes
  

  return (
    <div className="loader-wrap">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
      <div className="loader-wrap-heading flex flex-col items-center gap-2 text-4xl">
        <div className="load-text" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <span>
            <img className="w-[200px] phone:[300px]" src="assets/imgs/logo-light.png" alt="" />
          </span>
        </div>
        <div className="flex-col tablet:flex-row">
          {/* <div className="load-text text-xl">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div> */}
          {/* <div className="load-text">
            <span>S</span>
            <span>O</span>
            <span>L</span>
            <span>U</span>
            <span>T</span>
            <span>I</span>
            <span>O</span>
            <span>N</span>
            <span>S</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Loader;
