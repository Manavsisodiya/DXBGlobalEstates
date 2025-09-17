// WhyDubai.jsx
import './WhyDubai.css';
import why1 from '../images/why1.jpg'
import why2 from '../images/why2.jpg'
import why3 from '../images/why3.jpeg'
import why4 from '../images/why4.jpg'
import why5 from '../images/why5.jpg'
import why6 from '../images/why6.jpg'
import why7 from '../images/why7.jpg'
import why8 from '../images/why8.jpg'

function WhyDubai() {
    return (
        <div className='WhyDubai'>
            <h2 className='projecthead2'>
                WHY INVEST IN <span style={{color:"#f07c2e",fontWeight:'550'}}>DUBAI?</span>
            </h2>
            
            <div className='pcardsections2'>
                <div className='cards-grid'>
                    <div className='card11'>
                        <img className='cardimg22' alt='Higher Rental Yields' src={why1} />
                        <div className='card-content'>
                            <h2>Higher Rental Yields</h2>
                            <h3>Investors can earn rental yields of up to 8-10%** annually, surpassing many global markets.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='Zero Taxes' src={why2} />
                        <div className='card-content'>
                            <h2>Zero Taxes</h2>
                            <h3>The UAE offers zero income, capital gains, and wealth tax, maximising returns for investors.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='Premium Healthcare' src={why3} />
                        <div className='card-content'>
                            <h2>Premium Healthcare</h2>
                            <h3>With strong healthcare investments, the city is ideal for supporting your health and wellbeing.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='World Class Education' src={why4} />
                        <div className='card-content'>
                            <h2>World Class Education</h2>
                            <h3>Dubai offers world-class education through it's top-tier international institutions.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='Entertainment Hub' src={why5} />
                        <div className='card-content'>
                            <h2>Entertainment Hub</h2>
                            <h3>From iconic landmarks to theme parks and cultural events, Dubai is a world-class entertainment destination.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='UAE Golden Visa' src={why6} />
                        <div className='card-content'>
                            <h2>UAE Golden Visa</h2>
                            <h3>Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='Communal Safety' src={why7} />
                        <div className='card-content'>
                            <h2>Communal Safety</h2>
                            <h3>The UAE ranks among the world's safest nations, with a well-developed, effective law enforcement system.</h3>
                        </div>
                    </div>
                    <div className='card11'>
                        <img className='cardimg22' alt='Touristic Appeal' src={why8} />
                        <div className='card-content'>
                            <h2>Touristic Appeal</h2>
                            <h3>Dubai's iconic landmarks, luxury shopping, and vibrant culture make it a top global tourist destination</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyDubai;