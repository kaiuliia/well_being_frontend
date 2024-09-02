import React, { useState, useRef } from "react";
import { Popup } from "../layout/popup";
import { Button } from "../layout/button";

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
  const [isOpen, setIsOpen] = useState(false);

  const open = (e: any) => {
    // popover.current!.event = e;
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/*<Button onClick={openPopover}>Click Me</Button>*/}
      {isOpen && (
        <>
          <Popup
            close={() => setIsOpen(false)}
            description={advice.sleep}
            title={"How to sleep better"}
          />
        </>
      )}
      <div className={"float-animation"} id={"float"}>
        <Button
          onClick={open}
          name={"SLEEP"}
          className={`text-white cursor-pointer`}
        />
      </div>
    </>
  );
}
