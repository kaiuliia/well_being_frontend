import React, { useState } from "react";
import { ChangeEvent } from "../../types";
import { Slider, Grid } from "@mui/material";
import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";

import { CardHeader } from "@mui/material";
import { CardMedia } from "@mui/material";

interface Props {
  survey: string;
  onChange: (value: number | number[]) => void;
}
export const SliderBar = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    props.onChange(sliderValue);
  };

  const colors: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "lightblue",
    "blue",
    "violet",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "30rem",
          background: "lightblue",
          height: "8rem", // Increased height to accommodate the slider and labels
          padding: "1rem", // Added padding for better spacing
          alignItems: "center",
        }}
      >
        <Typography component="h3" align="center" variant="h6" gutterBottom>
          {props.survey}
        </Typography>

        <Slider
          sx={{
            width: "90%", // Set the width to 100% to fill the card
            color: "success.main",
            marginBottom: "0rem", // Added margin at the bottom for spacing
            paddingBottom: "0rem",
          }}
          value={sliderValue}
          valueLabelDisplay="auto"
          onChange={handleChange}
        />

        <Grid container justifyContent="space-between">
          <Typography component="h5" align="left" width="20%" fontSize="0.8rem">
            Minimal
          </Typography>
          <Typography
            component="h5"
            align="right"
            width="20%"
            fontSize="0.8rem"
          >
            Very much
          </Typography>
        </Grid>
      </Card>
    </Box>
  );
};
