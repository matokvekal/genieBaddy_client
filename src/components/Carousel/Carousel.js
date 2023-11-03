import React, { useState } from 'react';
import './carousel.css';
import avatar1 from 'assets/SVG/avatar1.svg';
import avatar2 from 'assets/SVG/avatar2.svg';
import avatar3 from 'assets/SVG/avatar3.svg';
import avatar4 from 'assets/SVG/avatar4.svg';
import avatar5 from 'assets/SVG/avatar5.svg';
import avatar6 from 'assets/SVG/avatar6.svg';
import avatar7 from 'assets/SVG/avatar7.svg';

const Carousel = (props) => {
  const{userTopic, setUserTopic} = props;
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
  const items = [
    { id: 1, title: 'relationship', image: 'avatar1.svg', color: '#FEEFB3', amount: 20 },
    { id: 2, title: 'anxiety', image: 'avatar2.svg', color: '#BCE2C8', amount: 6 },
    { id: 3, title: 'life', image: 'avatar3.svg', color: '#F6B1C3', amount: 7 },
    { id: 4, title: 'Family', image: 'avatar4.svg', color: '#BCE2A8', amount: 50 },
    { id: 5, title: 'divorce', image: 'avatar1.svg', color: '#F611C3', amount: 1 },
    { id: 6, title: 'Dismissal', image: 'avatar1.svg', color: '#B2E2C8', amount: 2 },
    { id: 7, title: 'Young people', image: 'avatar1.svg', color: '#16B1C3', amount: 10 },
  ];



  const handleItemClick = (itemId) => {
    // console.log('item clicked', itemId);
    setUserTopic(itemId);
  };

  return (
    <div className="carousel">
      {items.map((item) => (
        <div

     className={`carousel-item ${userTopic === item.id ? 'selected' : ''}`}
          key={item.id}
          style={{ backgroundColor: item.color }}
          onClick={() => handleItemClick(item.id)}
        >
          <img className="avatar-icon" src={avatars[item.id - 1]} alt={`Avatar ${item.id}`} width={40} />
          <div className="carousel-item-content">
            <h3>
              <i className="fa fa-heart"></i>
            </h3>
            <div>{`${item.title}(${item.amount})`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
