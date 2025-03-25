import React from 'react'
import './birthday.css'
const Wish = ({ name }) => {
  return (
    <div>
       <div className="emoji-text" role="img" aria-label="party">
          🎉
        </div>
      <div className="wish-message">
        HAPPY BIRTHDAY
        <br/> 
        <span className="highlight">{name.toUpperCase()}</span>  !!!
        
      </div>

        {/* 渲染多个 <bokeh> 元素 */}
        {[...Array(50)].map((_, index) => (
          <div key={index} className="bokeh"></div>
        ))}

        {/* 烟花特效 */}
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
        {/* 生日蛋糕和蜡烛 */}
        <div className="cake-area">
          <div className="candle">
            <div id="flame" className="lit"></div>
          </div>
          <div className="plate"></div>
          <div className="cake"></div>
          
        </div>
        
    </div>
  )
}

export default Wish
