import React, { useState } from "react";
import { ChangeEvent } from "../../types";
import { Slider, Grid } from "@mui/material";
import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  // colors: string;
  survey: string;
  onChange: (value: number | number[]) => void;
  max: string;
  min: string;
}
export const SliderBar = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    props.onChange(sliderValue);
  };
  const color = () => {
    // setSliderValue(newValue as number[]);
    if (sliderValue === 0) {
      return "secondary.main";
    }
    if (sliderValue < 30) {
      return "error.main";
    } else if (sliderValue >= 30 && sliderValue <= 70) {
      return "warning.main";
    } else {
      return "info.main";
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "0.8rem",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="subtitle1"
        align="left"
        margin="0rem"
        paddingBottom="0.5rem"
      >
        {props.survey}
      </Typography>

      <Slider
        sx={{
          width: "100%",
          margin: "0rem",
          padding: "0rem",
          color: color,
          "& .MuiSlider-valueLabel": {
            backgroundColor: color,
          },
        }}
        value={sliderValue}
        valueLabelDisplay="auto"
        color="primary"
        onChange={handleChange}
      />

      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="caption"
          align="left"
          width="40%"
          paddingTop="0.5rem"
        >
          {props.min}
        </Typography>
        <Typography
          variant="caption"
          align="right"
          width="40%"
          paddingBottom="0rem"
        >
          {props.max}
        </Typography>
      </Grid>
    </Card>
    // </Box>
  );
};
