const toggle = () => {
  const menu = document.getElementsByClassName("hamburger-menu")[0];

  if (menu.classList.contains("opened")) {
    menu.classList.remove("opened");
  } else {
    menu.classList.add("opened");
  }
};
