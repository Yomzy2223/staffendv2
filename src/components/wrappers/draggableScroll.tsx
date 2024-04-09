import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { useGlobalFunctions } from "@/hooks/globalFunctions";

const DraggableScroll = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const scrollableContainer = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hasHorScroll, setHasHorScroll] = useState(false);

  const { isDesktop } = useGlobalFunctions();

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!isMouseDown) return;

    const deltaX = event.pageX - startX;
    if (!scrollableContainer.current) return;
    scrollableContainer.current.scrollLeft -= deltaX;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const horScrollAdded = scrollableContainer.current
    ? scrollableContainer.current?.scrollWidth >
      scrollableContainer.current?.offsetWidth
    : false;

  useEffect(() => {
    setHasHorScroll(horScrollAdded);
  }, [horScrollAdded]);

  return (
    <div className="relative group">
      <div
        ref={scrollableContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={cn(
          "max-w-full overflow-auto select-none",
          { "cursor-grab": hasHorScroll },
          className
        )}
      >
        {children}
      </div>
      {hasHorScroll && isDesktop && (
        <div className="absolute bottom-0 left-0 right-0 h-3.5 z-40 bg-white group-hover:bg-transparent transition-all duration-500" />
      )}
    </div>
  );
};
export default DraggableScroll;
