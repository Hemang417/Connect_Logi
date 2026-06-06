import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-0">
      <div className="px-4 flex justify-end w-full">
        <div className="flex flex-col text-right">
          <small className="text-sm mb-2">
            &copy; {new Date().getFullYear()} Seawave Forwarding & Logistics Pvt. Ltd.
          </small>
          <nav className="flex justify-end px-4">
            <a href="#" className="hover:text-blue-400 text-white mx-2" style={{fontSize:"12px"}}>Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 text-white mx-2" style={{fontSize:"12px"}}>Terms of Service</a>
            <a href="#" className="hover:text-blue-400 text-white mx-2" style={{fontSize:"12px"}}>Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
