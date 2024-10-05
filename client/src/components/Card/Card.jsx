import React from "react";
import "./Card.scss";
export default function Card({
  imageUrl,
  label,
  description,
  cardLink,
  cardClass,
}) {
  return (
    <>
      <a className="link" href={cardLink}>
        <div className={`Card ${cardClass}`}>
          {cardClass==="Project"&&<h3>{label}</h3>}
          <img className='Card__Photo' src={imageUrl} alt="" />

          {cardClass!=="Project"&&<div className="Card__Name">{label}</div>}
          <div className="Card__Description">{description}</div>
          <div className="Card__Links"></div>
        </div>
      </a>
    </>
  );
}
