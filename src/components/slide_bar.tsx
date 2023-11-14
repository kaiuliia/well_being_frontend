import React from "react";

export const SliderBar = () => {
  // const value = useSelector((state) => state.passw.length);
  // const dispatch = useDispatch();
  // const changeSlider = (event: any) => {
  //   event.target.value;
  // };

  return (
    <div>
      <div className="slider-container">
        <div className="slider-left">
          <p>Character length</p>
        </div>
        <div className="slider-right">
          <p className="passwordLength">{10}</p>
        </div>
      </div>
      <div className="slider-bar">
        <input
          type="range"
          min="10"
          max="50"
          // value={20}
          className="slider"
          id="myRange"
          // onChange={changeSlider}
        />
      </div>
    </div>
  );
};
