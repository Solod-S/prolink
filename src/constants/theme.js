export const theme = {
  colors: {
    primaryBgColor: "#F5F5F5",
    secondBgColor: "#eef3f8",
    thirdBgColor: "white",
    primaryTextColor: "#757575",
    secondTextColor: "#0a66c2",
    thirdTextColor: "#2977c9",
    fourthTextColor: "white",
    borderColor: "#000000E6",
    // rgba(0, 0, 0, 0.9)
  },
  breakpoints: {
    mobile: "478px",
    tablet: "768px",
    desktop: "1128px",
  },
  spacing: (value) => `${4 * value}px`,
  space: [0, 2, 4, 8, 15, 32, 60, 94, 128, 256],
  fontSizes: {
    xxxxs: "10px",
    xxxs: "12px",
    xxs: "14px",
    xs: "16px",
    s: "18px",
    m: "22px",
    l: "24px",
    xl: "26px",
    xxl: "28px",
    xxxl: "36px",
    xxxxl: "40px",
    xxxxxl: "44px",
  },
  fontWeight: {
    normal: 500,
    bolt: 700,
    superBolt: 900,
  },
  radii: {
    none: "0",
    normal: "4px",
    round: "50%",
  },
  fontFamily: {
    raleway: "'Raleway', sans-serif",
    arial: "Arial,sans-serif",
  },
};
