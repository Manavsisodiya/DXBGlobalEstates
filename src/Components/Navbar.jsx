import './Navbar.css';
function Navbar() {
  return (
    <div className='navcontain'>
        <div className='logosec'>
            <h1>DXBGlobal</h1>
        </div>
        <div className='navlist'>
            <h5>Home</h5>
            <h5>Our Projects</h5>  
            <h5>About us</h5>
            <h5>Our Team</h5>
            <h5>Blog/News</h5>
            <h5>Contact Us</h5>
        </div>
    </div>
  );
}

export default Navbar;
