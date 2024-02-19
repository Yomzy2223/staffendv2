const tagColors = [
  {
    text: "hsl(300,100%,41%)",
    bg: "bg-[hsl(300,100%,91%)]",
  },
  {
    text: "hsl(250, 100%, 41%)",
    bg: "bg-[hsl(250,100%,91%)]",
  },
  {
    text: "hsl(200, 100%, 41%)",
    bg: "bg-[hsl(200,100%,91%)]",
  },
  {
    text: "hsl(150, 100%, 41%)",
    bg: "bg-[hsl(150,100%,91%)]",
  },
  {
    text: "hsl(100, 100%, 41%)",
    bg: "bg-[hsl(100,100%,91%)]",
  },
  {
    text: "hsl(50, 100%, 41%)",
    bg: "bg-[hsl(50,100%,91%)]",
  },
];

export const getRandColor = (i: number) => {
  return tagColors[i % 5];
};
