import React, { useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { IonButton, IonContent, IonPopover } from "@ionic/react";
import { useLocalStore } from "../../store/useStore";

export function Advice() {
  const { dashboard } = useLocalStore();
  console.log("dash", dashboard);

  const advice = {
    sleep:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
  };
  // const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    // popover.current!.event = e;
    setPopoverOpen(true);
  };
  return (
    <>
      <Button onClick={openPopover}>Click Me</Button>
      {/*<IonPopover*/}
      {/*  // ref={popover}*/}
      {/*  isOpen={popoverOpen}*/}
      {/*  onDidDismiss={() => setPopoverOpen(false)}*/}
      {/*>*/}
      {/*  <IonContent class="ion-padding absolute top-0">Hello World!</IonContent>*/}
      {/*</IonPopover>*/}
      <div className={"w-[100%] h-[100%] bg-black"}>
        <div className=" w-full text-sm h-fit p-2 text-white absolute top-0 border-[1px] border-white-900">
          {advice.sleep}
        </div>
      </div>
    </>
  );
}
