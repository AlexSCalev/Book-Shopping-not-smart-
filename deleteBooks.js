let removeCard = function(id_remove) {
    let formRemove = document.createElement("form");
    let id_remove_input = document.createElement("input");
    let submit_remove = document.createElement("input");
    formRemove.setAttribute("method","POST");
    formRemove.setAttribute("action","deleteCard.php");
    formRemove.setAttribute("style","display:none;");
    id_remove_input.setAttribute("name","id");
    id_remove_input.setAttribute("value",id_remove);
    submit_remove.setAttribute("type","submit");
    formRemove.append(id_remove_input);
    formRemove.append(submit_remove);
    return formRemove;
}
document.querySelectorAll("[name = delete]").forEach(element =>{
    element.addEventListener("click",(event) => {
        event.target.parentNode.append(removeCard(event.target.parentNode.getAttribute("id")));
        event.target.parentNode.querySelector("form").lastElementChild.click();
    });
});