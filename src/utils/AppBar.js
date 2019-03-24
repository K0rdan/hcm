export const getHeight = isSmall => {
  if (isSmall === true) {
    return 56;
  } else {
    return 64;
  }
};

export const AppBar = {
  getHeight,
};

export default AppBar;
