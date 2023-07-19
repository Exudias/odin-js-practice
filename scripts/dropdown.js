(function () {
    const opt1 = document.querySelector("#opt1");
    const opt2 = document.querySelector("#opt2");
    const opt3 = document.querySelector("#opt3");

    opt1.onclick = (e) => onClickOption(e, "Option 1 clicked");
    opt2.onclick = (e) => onClickOption(e, "Option 2 clicked");
    opt3.onclick = (e) => onClickOption(e, "Option 3 clicked");

    function onClickOption(e, displayText)
    {
        e.stopPropagation();
        console.log(displayText);
    }
})();