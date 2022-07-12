export const handleWeight = (props: any) => {
  switch (props?.weight) {
    case "light":
      return "400";
    case "regular":
      return "500";
    case "bold":
      return "700";
    default:
      return "400";
  }
};

export const handleAlign = (props: any) => {
  switch (props?.align) {
    case "left":
      return "left";
    case "center":
      return "center";
    case "right":
      return "right";
    default:
      return "left";
  }
};

export const HandleFontSize = (props: any) => {
  return `${props?.size}`;
};
