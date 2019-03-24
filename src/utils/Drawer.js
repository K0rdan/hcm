export const getWidth = (isDrawerOpen, isSmall) => {
  if (isDrawerOpen) {
    if (isSmall === true) {
      return 135;
    } else {
      return 150;
    }
  } else {
    return 0;
  }
};

export const Drawer = {
  getWidth,
};

export default Drawer;
