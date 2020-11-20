//global imports
//Mostly taken from: https://gist.github.com/reecelucas/cd110ece696cca8468db895281fa28cb
import React, {useState, useEffect } from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SCROLL_UP = "up";
const SCROLL_DOWN = "down";
const SCROLL_NONE = "none";

export default function ScrollDirection ({
  initialDirection,
  thresholdPixels
}) {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      if (scrollY === 0.0) setScrollDir(SCROLL_NONE);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels]);

  return scrollDir;
}
