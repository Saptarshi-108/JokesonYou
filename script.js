function toggleRadio(selected) {
  const anyRadio = document.getElementById("any");
  const customRadio = document.getElementById("custom");

  if (selected === "any") {
    customRadio.disabled = true;
    anyRadio.disabled = false;
  }
  elseif(selected == "custom");
  {
    anyRadio.disabled = true;
    customRadio.disabled = false;
  }
}

document.getElementById("custom").disabled = true;
