class PopupParent extends HTMLElement {
    constructor() {
        super();
    }
}

const TAG = {
    POPUP_DIV: "popup-div",
    POPUP_PARENT: "popup-parent",
}

const CLASS = {
    ERROR_MSG: "error-msg",
}

const KEYCODE = {
    ENTER: 13,
}

customElements.define(TAG.POPUP_PARENT, PopupParent);

function getElem(elementID_OR_element) {
    let element = null;

    if (elementID_OR_element instanceof Element) {
        element = elementID_OR_element;
        if (!element) {
            throw new Error(`Object is instanceof Element, but is null`)
        }
    } else {
        let elementID = elementID_OR_element;
        element = document.getElementById(elementID);
        if (!element) {
            throw new Error(`Can't find element with ID '${elementID}'`)
        }
    }
    return element;
}

function setElemInnerText(elementID_OR_element, newInnerText){
    getElem(elementID_OR_element).innerText = newInnerText;
}

function getChildPopupDiv(parentElement_OR_parentElementID){
    const parent = getElem(parentElement_OR_parentElementID);
    const upperTag = TAG.POPUP_PARENT.toUpperCase()
    if (parent.tagName !== upperTag) { // tagName returns upper-case
        throw new Error(`Element tagName: '${parent.tagName}', expected: '${upperTag}'`);
    }
    let childPopupDiv = null;
    
    const children = Array.from(parent.children);
    children.forEach(child => {
        if (child.classList.contains(TAG.POPUP_DIV)) {
            if (childPopupDiv) {
                throw new Error(`More than one child with class '${TAG.POPUP_DIV}' found under parent\n:${parent}`)
            }
            childPopupDiv = child;
        }
    });

    if (!childPopupDiv) {
        throw new Error(`Can't find child with class '${TAG.POPUP_DIV}' under parent with id: '${parent.id}'\n${parent}`)
    }
    return childPopupDiv;
}

function getSiblingPopupDiv(siblingElement_OR_siblingElementID){
    let parent = getElem(siblingElement_OR_siblingElementID).parentElement;
    return getChildPopupDiv(parent);
}

function setChildPopupDivInnerText(parentElement_OR_parentElementID, newInnerText) {
    setElemInnerText(getChildPopupDiv(parentElement_OR_parentElementID), newInnerText);
}

function setSiblingPopupDivInnerText(siblingElement_OR_siblingElementID, newInnerText) {
    setElemInnerText(getSiblingPopupDiv(siblingElement_OR_siblingElementID), newInnerText);
}