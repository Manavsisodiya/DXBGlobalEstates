import './Expertise.css';
import loan from '../images/loan.png'
import calculator from '../images/calculator.png'
import deal from '../images/deal.png'
function Expertise() {
  return (
    <div className='Expertise'>
        <h2 className='heading'>Our<span style={{color:"#f07c2e",fontWeight:'550'}}> Expertise</span></h2>
        <h4 className='subheading'>At DXB Global Estates, we focus on what truly matters  empowering your real estate journey with trust, expertise, and results.</h4>
        <div className='cardsec'>
            <div  className='card1'>
                <img alt="logos" src={deal}></img>
                <h3>Buy & Sell Properties</h3>
                <h5>We assist with buying and selling both residential and commercial spaces, ensuring a smooth and transparent process from start to finish.</h5>
                <h6>LEARN MORE</h6>
            </div>
            <div className='card2'>
                <img alt="logos" src={loan}></img>
                <h3>Investment Guidance</h3>
                <h5>Whether you're a first-time investor or growing your portfolio, we provide expert advice backed by market research and real-world insights.</h5>
                <h6>LEARN MORE</h6>
            </div>
            <div className='card3'>
                <img alt="logos" src={calculator}></img>
                <h3>Property Management</h3>
                <h5>We offer full-service property management, including tenant coordination, maintenance, and timely reporting — so you stay stress-free.</h5>
                <h6>LEARN MORE</h6>
            </div>
        </div>
    </div>
  );
}

export default Expertise;
