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

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    <Card
      sx={{
        width: "100%", // Set the width to 100% to be responsive
        height: "auto", // Auto height to fit content
        display: "flex",
        flexDirection: "column",
        padding: "0.8rem",
        alignItems: "flex-start", // Align Survey name to the left
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
          // paddingBottom="0.8rem"
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
