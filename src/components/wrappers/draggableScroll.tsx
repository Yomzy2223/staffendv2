import React, {
  MouseEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const DraggableScroll = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  // const [mouseDown, setMouseDown] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeftStart, setScrollLeftStart] = useState(0);

  // const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
  //   setMouseDown(true);
  //   setStartX(e.pageX);
  //   setScrollLeftStart(divRef.current?.scrollLeft || 0);
  // };

  // useEffect(() => {
  //   document.addEventListener("mousemove", (e) => {
  //     if (!mouseDown) return;
  //     console.log(mouseDown);

  //     const scrollLeftChange = e.pageX - startX;
  //     console.log(scrollLeftChange);
  //     if (divRef.current) {
  //       divRef.current.scrollLeft = scrollLeftStart - scrollLeftChange;
  //       console.log(divRef.current.scrollLeft);
  //     }
  //   });

  //   return () =>
  //     document.removeEventListener("mousemove", () => {
  //       setMouseDown(false);
  //     });
  // }, [mouseDown, scrollLeftStart, startX]);

  // useEffect(() => {
  //   document.addEventListener("mouseup", () => {
  //     setMouseDown(false);
  //   });

  //   return () =>
  //     document.removeEventListener("mouseup", () => {
  //       setMouseDown(false);
  //     });
  // }, []);

  // return (
  //   <div className="cursor-grab" onMouseDown={handleMouseDown}>
  //     {children}
  //   </div>
  // );

  const scrollableContainer = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  // const scrollX = useSpring(0); // Animated scroll position

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isMouseDown) return;

    const deltaX = event.pageX - startX;
    // scrollX.set(scrollX.get() + deltaX); // Update scroll position based on drag distance
    if (!scrollableContainer.current) return;
    scrollableContainer.current.scrollLeft -= deltaX;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="relative group">
      <motion.div
        ref={scrollableContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={cn(
          "max-w-full overflow-auto cursor-grab select-none",
          className
        )}
        // whileHover={{ overflowX: "auto" }}
      >
        {children}
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-3.5 z-40 bg-white group-hover:bg-transparent transition-all duration-500" />
    </div>
  );
};
export default DraggableScroll;
