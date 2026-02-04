import React, { useState, useEffect } from "react";
import "../componentStyles/Rating.css";

function Rating({
  value = 0,
  onRatingChange,
  disabled = false,
  allowHalf = true
}) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(value);

  // sync with backend value
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const displayValue = hovered !== null ? hovered : selected;

  const handleMove = (e, starIndex) => {
    if (disabled) return;

    if (!allowHalf) {
      setHovered(starIndex);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const isHalf = e.clientX - rect.left < rect.width / 2;
    setHovered(isHalf ? starIndex - 0.5 : starIndex);
  };

  const handleLeave = () => {
    if (disabled) return;
    setHovered(null);
  };

  const handleClick = (rating) => {
    if (disabled) return;
    setSelected(rating);
    onRatingChange && onRatingChange(rating);
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    let fillType = "empty";

    if (displayValue >= i) fillType = "full";
    else if (displayValue >= i - 0.5) fillType = "half";

    stars.push(
      <span
        key={i}
        className={`star star-${fillType}`}
        onMouseMove={(e) => handleMove(e, i)}
        onMouseLeave={handleLeave}
        onClick={() => handleClick(displayValue)}
      >
        ★
      </span>
    );
  }

  return <div className="rating">{stars}</div>;
}

export default Rating;
