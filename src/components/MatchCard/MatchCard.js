import React from "react";
// import "./FriendCard.css";

const MatchCard = props => (


<div onClick={() => props.setClicked(props.id)} id={props.id} className="click-item" style={{backgroundImage: `url(${props.image})`}}>
</div>





);

export default MatchCard;
