!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");n.setAttribute("disabled",!0),e.addEventListener("click",(function(){t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),e.setAttribute("disabled",!0),n.removeAttribute("disabled")})),n.addEventListener("click",(function(){clearInterval(t),e.removeAttribute("disabled"),n.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.2f31b7f9.js.map
