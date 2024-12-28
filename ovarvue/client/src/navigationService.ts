// navigationService.js
let navigate;

export const setNavigate = (navigateFunction) => {
  navigate = navigateFunction;
};

export const navigateTo = (path) => {
  if (navigate) {
    navigate(path);
  } else {
    console.error("Navigate function is not set");
  }
};
