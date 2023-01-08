let container = null;
let selectedParent = null;
let index_selected = -1;
let index_col_selected = 0;

let index_accordion = 0;
let c = [];
let g = [];
let t = [];
let compo = [];

let list_selected = [];
let dataProperties = [];
let myModalEl = document.querySelector('#modalDelete');
let btn_yes = document.querySelector('#button_yes');

let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);

myModalEl.addEventListener('shown.bs.modal', () => {
    btn_yes.focus()
})


let tab_property = document.getElementById("tab_property").children[0];
const text_prop = "<b>Propriétés de </b>";

const InputType = {
    Text: 0,
    Password: 1,
    Date: 2,
    Time: 3,
    DateTime: 4,
    Week: 5,
    Numeric: 6,
    Color: 7,
    Range: 8,
    File: 9,
    Radio: 10,
    CheckBox: 11,
    //
    Email: 12,
    Tel: 13,
    Search: 14,
    Hidden: 15,
    Switch: 16,
    //
    Button: 17,
    Submit: 18,
}

const CompoType = {
    Navbar: 0,
    Accordeon: 1,
    Alert: 2,
    Badge: 3,
    Tabs: 4,
    Collapse: 5,
    Dropdown: 6,
    ListGroup: 7,
    Card: 8,
    BreadCrumb: 9,
    OffCanvas: 10,
    Pagination: 11,
    Popover: 12,
    Progress: 13,
    Spinner: 14,
    Toast: 15,
    Tooltips: 16,

}

function onDelete() {
    if (selectedParent) {
        selectedParent.remove();
        selectedParent = null;
    }
    modal.hide();
}

function Container() {
    let cont = document.getElementById('cont')
    container = document.createElement('div');
    container.setAttribute("id", "container")
    container.setAttribute("name", "Container");
    container.classList.add("container");
    container.classList.add("container_proto");
    container.addEventListener("click", () => {
        AllUnSelection();
        let selected = container.classList.toggle("focus")
        if (selected) {
            tab_property.innerHTML = text_prop + "Container";
            selectedParent = container;
            GetProperties();
        }
        selectedParent = container;
        list_selected = [];
        list_selected = [selectedParent];
    });
    cont.append(container);
    return this;
}

function Grid(...args) {

    let row = document.createElement('div');
    row.classList.add("rowproto");
    row.classList.add("row");
    row.setAttribute("id", "row");
    row.setAttribute("name", "Rang");

    if (selectedParent == null) {
        document.body.appendChild(row);
    } else {
        selectedParent.appendChild(row)
    }
    for (let i = 0; i < args.length; i++) {

        if (args.length === 2) {
            if (args[0] === args[1]) {
                let col = new Col();
                row.appendChild(col);
            } else// chiffres asymétriques
            {
                if (i === 0) {
                    let col = new Col(args[i]);
                    row.appendChild(col);
                } else {
                    let col = new Col();
                    row.appendChild(col);
                }
            }
        } else {
            let col = new Col();
            row.appendChild(col);
        }
    }

    let rows = document.getElementsByClassName('row')
    for (let i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", function () {
            event.stopPropagation()
            AllUnSelection();
            let selected = this.classList.toggle("focus");
            if (selected) {
                tab_property.innerHTML = text_prop + "Grille";
                selectedParent = this;
                GetProperties();
            }

            list_selected = [];
            list_selected = [selectedParent];
        }, false);
    }
    return row;
}

function Row() {
    let row = document.createElement('div');
    row.setAttribute("id", "row");
    row.setAttribute("name", "Rang");
    row.classList.add("rowproto");
    row.classList.add("row");
    if (selectedParent == null) {
        document.body.appendChild(row);
    } else {
        selectedParent.appendChild(row)
    }
    let rows = document.getElementsByClassName('row')
    for (let i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", function () {
            event.stopPropagation()
            AllUnSelection();
            let selected = this.classList.toggle("focus");
            if (selected) {
                tab_property.innerHTML = text_prop + "Rangée";
                selectedParent = this;
                GetProperties();
            }
            selectedParent = this;
            list_selected = [selectedParent];
        }, false);
    }
    return row;
}

function AddListenerCol(classname, typename) {
    let cols = document.getElementsByClassName(classname)
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].classList.contains("colproto")) {
            cols[i].addEventListener("click", function () {
                event.stopPropagation()
                AllUnSelection();
                let selected = this.classList.toggle("focus");
                if (selected) {
                    tab_property.innerHTML = text_prop + typename;
                    selectedParent = this;
                    GetProperties();
                }

                list_selected = [selectedParent];
            }, false);
        }

    }
}

function Col(number = 0) {
    let col = document.createElement('div');
    col.setAttribute("id", "col")
    col.setAttribute("name", "Colonne");
    col.classList.add("colproto");
    if (number > 0) {
        col.classList.add("col-" + number);
    } else {
        col.classList.add("col");
    }

    col.addEventListener("click", () => {
        let selected = col.classList.toggle("focus")
        selectedParent = (selected === true) ? col : null;
    })
    if (selectedParent == null) {
        document.body.appendChild(col);
    } else {
        selectedParent.appendChild(col)
    }
    AddListenerCol("col", "Colonne");
    AddListenerCol("col-4", "Colonne");
    AddListenerCol("col-8", "Colonne");

    return col;
}

function Input(type, value, id, placeholder) {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let input = document.createElement('input');

    div.setAttribute("id", "id_" + type);
    div.setAttribute("name", "name_" + type);

    if (type === "tel") {
        input.setAttribute("data-pattern", "** ** ** ** **");
        input.setAttribute("placeholder", placeholder);
        input.classList.add("masked");
        div.classList.add("input-tel");
    }
    if (type === "mail") {
        div.classList.add("input-mail");
        input.setAttribute("type", "mail");
    }

    input.setAttribute("type", type);
    input.setAttribute("id", "id_" + type);
    input.setAttribute("name", "name_" + type);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("aria-label", placeholder);
    input.setAttribute("aria-describedby", id);


    switch (type) {

        case "checkbox":
            div.classList.add("form-check");
            div.classList.add("form-checkproto");
            input.classList.add("form-check-input");
            if (value === "checked") {
                input.setAttribute("checked", "");
            }
            span.innerHTML = placeholder;
            break;

        case "switch":
            let div_switch = document.createElement("div");
            div_switch.setAttribute("type", "switch");
            div.classList.add("mb-3")
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            div.classList.add("me-2");
            div.setAttribute("id", "id_" + type);
            div.setAttribute("name", "name_" + type);

            span.classList.add("me-2");
            div_switch.innerHTML = "<label class=\"switch\">\n" +
                " <input type=\"checkbox\" id=\"togBtn\">\n" +
                " <div class=\"slider round\">\n" +
                "  <!--ADDED HTML -->\n" +
                "  <span class=\"on\">ON</span>\n" +
                "  <span class=\"off\">OFF</span>\n" +
                "  <!--END-->\n" +
                " </div>\n" +
                "</label>";
            span.innerHTML = placeholder;
            div.append(span);
            div.append(div_switch);
            break;

        case "radio":
            div.classList.add("form-check");
            div.classList.add("form-checkproto");
            //div.setAttribute("id", "id_" + type);
            //div.setAttribute("name", "name_" + type);

            input.classList.add("form-check-input");
            if (value === "checked") {
                input.setAttribute("checked", "");
            }
            span.innerHTML = placeholder;
            break;

        case "range":
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            div.style.flexWrap = "nowrap";
            div.style.alignItems = "center";
            div.classList.add("mb-3");
            input.classList.add("form-range");
            span.classList.add("input-group-text");
            span.innerHTML = placeholder;
            input.addEventListener("change", () => {
                span.innerHTML = placeholder + input.value;
            });
            input.addEventListener("input", () => {
                span.innerHTML = placeholder + input.value;
            });
            break;

        case "file":
            div.classList.add("mb-3")
            input.setAttribute("value", value);
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            input.classList.add("form-control");
            div.classList.add("input-file");
            break;

        case "hidden":
            input.setAttribute("type", type);
            div.classList.add("mb-3")
            input.setAttribute("value", value);
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            span.classList.add("input-group-text");
            input.classList.add("form-control");
            span.innerHTML = "Hidden";
            span.style.height = "28px";
            div.style.border = "1px solid lightgray";
            div.style.backgroundColor = "white";
            div.style.height = "31px";
            div.style.borderRadius = "4px";
            div.classList.add("input-hidden");
            break;

        case "search":
            div.classList.add("mb-3")
            input.setAttribute("value", value);
            //div.setAttribute("id", "id_" + type);
            //div.setAttribute("name", "name_" + type);
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            input.classList.add("form-control");
            let btnSearch = document.createElement("a");
            btnSearch.classList.add("btn");
            btnSearch.classList.add("btn-light");
            btnSearch.setAttribute("type", "search");
            btnSearch.innerHTML = "<i class=\"fas fa-search\"></i>";
            btnSearch.style.border = "1px solid lightgray";
            div.append(input);
            div.append(btnSearch);
            break;

        default:
            div.classList.add("mb-3")
            input.setAttribute("value", value);
            div.classList.add("input-group");
            div.classList.add("input-groupproto");
            span.classList.add("input-group-text");
            input.classList.add("form-control");
            break;
    }
    if (type === "color") {
        div.classList.add('input-color');
    }
    if (type !== "search" && type !== "switch") {
        div.append(span);
        div.append(input);
    }

    if (selectedParent == null) {
        document.body.appendChild(div);
    } else {
        selectedParent.appendChild(div)
    }

    AddListenerInputs("form-check", "Bouton ");
    AddListenerInputs("input-group", "Input ");
    RefreshMasked();
    RefreshPrefixed();
    return input;
}

function AddListenerInputs(classname, typename) {
    let inputs = document.getElementsByClassName(classname)
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function () {
            event.stopPropagation()
            AllUnSelection();
            let selected = this.classList.toggle("focus");
            if (selected) {
                let type_a = this.children[1].getAttribute('type');
                tab_property.innerHTML = text_prop + typename + type_a;
                list_selected = [selectedParent];
                GetProperties();
            }
            selectedParent = this;
        }, false);
    }
}

function AddListenerComponents(classname, typename) {
    let compos = document.getElementsByClassName(classname)
    for (let i = 0; i < compos.length; i++) {
        compos[i].addEventListener("click", function () {
            event.stopPropagation()
            AllUnSelection();
            let selected = this.classList.toggle("focus");
            if (selected) {
                let type_a = this.children[1].getAttribute('type');
                tab_property.innerHTML = text_prop + typename + type_a;
                list_selected = [selectedParent];
                GetProperties();
            }
            selectedParent = this;
        }, false);
    }
}

function Compo(name, id, value, placeholder) {
    let div = document.createElement("div");
    div.setAttribute("id", "id_" + name);
    div.setAttribute("name", name);
    div.classList.add("compo_proto");
    container.append(div);
    switch (name) {
        case "accordion":
            div.setAttribute("id", "id_" + name + id);
            for (let i = 0; i < placeholder.length; i++) {
                let div_item = document.createElement("div");
                div_item.classList.add("accordion-item");
                let h2 = document.createElement("h2");
                h2.classList.add("accordion-header");
                h2.setAttribute("id", "head" + id + (i + 1));
                let button = document.createElement("button");
                button.classList.add("accordion-button");
                if (i !== 0) {
                    button.classList.add("collapsed");
                }
                button.setAttribute("data-bs-toggle", "collapse");
                button.setAttribute("data-bs-target", "#collapse_" + id + (i + 1));
                button.setAttribute("aria-expanded", (i === 0) ? "true" : "false");

                button.innerHTML = placeholder[i].name;
                div_item.append(h2);
                h2.append(button);
                let div_collapse = document.createElement("div");
                div_collapse.classList.add("accordion-collapse");
                div_collapse.classList.add("collapse");
                div_collapse.setAttribute("id", "collapse_" + id + (i + 1));
                if (i === 0) {
                    div_collapse.classList.add("show");
                }
                div_collapse.setAttribute("data-bs-parent", "#id_" + name + id);
                div_item.append(div_collapse);
                let div_body = document.createElement("div");
                div_body.classList.add("accordion-body");
                div_body.innerHTML = placeholder[i].content;
                div_collapse.append(div_body);
                div.append(div_item);
            }
            break;
        case "navbar":

            break;
        case "badge":

            break;
        case "alert":

            break;
        case "tabs":

            break;
        case "collapse":

            break;
        case "dropdown":

            break;
        case "listgroup":

            break;
        case "card":

            break;
        case "carousel":

            break;
        case "offcanvas":

            break;
        case "pagination":

            break;
        case "popover":

            break;
        case "progress":

            break;
        case "spinner":

            break;
        case "toast":

            break;
        case "tooltips":

            break;
    }
    if (selectedParent == null) {
        document.body.appendChild(div);
    } else {
        selectedParent.appendChild(div)
    }
    AddListenerComponents("compo_proto", "Component")
}

function AllUnSelection() {
    let rows = document.querySelectorAll(".focus");
    rows.forEach(element => {
        element.classList.remove("focus");
    });
}

function DeleteComponent() {
    modal.show();
}

let list_inputs = [];
let list_containers = [];
let list_compo = [];

function CreateCategories() {
    fetch("json/components.json")
        .then(response => response.json())
        .then(data => {
            list_inputs = data.filter(compo => compo.category === "input");
            list_containers = data.filter(compo => compo.category === "grid");
            list_compo = data.filter(compo => compo.category === "compo");
            CreateListContainer();
            CreateListInput();
            CreateListComponent();
            InitActionsGrid();
            InitActionsInputs();
            InitActionsComponent();
        })
}

function CreateListInput() {
    const component = document.getElementById("panel_input");
    for (let i = 0; i < list_inputs.length; i++) {
        c[i] = new QLabel("Input " + list_inputs[i].type, component, "QComponent");
    }
}

function CreateListComponent() {
    const component = document.getElementById("panel_compo");
    for (let i = 0; i < list_compo.length; i++) {
        compo[i] = new QLabel(list_compo[i].type, component, "QComponent");
    }
}

function CreateListContainer() {
    const component = document.getElementById("panel_container");
    for (let i = 0; i < list_containers.length; i++) {
        g[i] = new QLabel(list_containers[i].name, component, "QComponent");
    }
}

function InitActionsGrid() {
    if (g.length > 0) {

        g[0].setCallBack(() => {
            new Row();
        });
        g[1].setCallBack(() => {
            new Col();
        });
        g[2].setCallBack(() => {
            new Grid(12);
        });
        g[3].setCallBack(() => {
            new Grid(6, 6);
        });
        g[4].setCallBack(() => {
            new Grid(4, 8);
        });
        g[5].setCallBack(() => {
            new Grid(8, 4);
        });
        g[6].setCallBack(() => {
            new Grid(4, 4, 4);
        });
        g[7].setCallBack(() => {
            new Grid(3, 3, 3, 3);
        });
        g[8].setCallBack(() => {
            new Grid(2, 2, 2, 2, 2);
        });
    }
}

function InitActionsInputs() {

    if (c.length > 0) {

        c[InputType.Text].setCallBack(() => {
            new Input("text", "", "input", "Nom du champ");
        });
        c[InputType.Password].setCallBack(() => {
            new Input("password", "1234567", "password", "Mot de passe");
        });
        c[InputType.Date].setCallBack(() => {
            new Input("date", formatDate(new Date()), "date");
        });
        c[InputType.Time].setCallBack(() => {
            new Input("time", formatTime(new Date()));
        });
        c[InputType.DateTime].setCallBack(() => {
            new Input("datetime-locale", new Date());
        });
        c[InputType.Week].setCallBack(() => {
            new Input("week", formatWeek(new Date()));
        });
        c[InputType.Numeric].setCallBack(() => {
            new Input("number", 100, "numeric");
        });
        c[InputType.Color].setCallBack(() => {
            new Input("color", "red", "color");
        });
        c[InputType.Range].setCallBack(() => {
            new Input("range", 50, "range", "Range: ");
        });
        c[InputType.File].setCallBack(() => {
            new Input("file", "", "file");
        });
        c[InputType.Radio].setCallBack(() => {
            new Input("radio", "", "radio", "Radio");
        });
        c[InputType.CheckBox].setCallBack(() => {
            new Input("checkbox", "checked", "checkbox", "CheckBox");
        });
        c[InputType.Email].setCallBack(() => {
            new Input("mail", "", "mail", "adresse mail");
        });
        c[InputType.Tel].setCallBack(() => {
            new Input("tel", "", "tel", "06 22 66 33 99");
        });
        c[InputType.Search].setCallBack(() => {
            new Input("search", "", "search", "Rechercher...");
        });
        c[InputType.Hidden].setCallBack(() => {
            new Input("hidden", "", "hidden", "Champs caché");
        });
        c[InputType.Switch].setCallBack(() => {
            new Input("switch", "", "switch", "Switch");
        });
    }
}

function InitActionsComponent() {
    if (compo.length > 0) {
        compo[CompoType.Accordeon].setCallBack(() => {
            let first = "Il s'agit du corps accordéon du premier élément.";
            let second = "Il s'agit du corps accordéon du second élément.";
            let third = "Il s'agit du corps accordéon du troisième élément.";
            let common = "Il est affiché par défaut, jusqu'à ce que le plugin de repli ajoute les classes appropriées que nous utilisons pour styliser chaque élément. Ces classes contrôlent l'apparence générale, ainsi que l'affichage et le masquage via des transitions CSS. Vous pouvez modifier tout cela avec un CSS personnalisé ou remplacer nos variables par défaut. Il convient également de noter qu'à peu près n'importe quel HTML peut aller dans le .accordion-body, bien que la transition limite le débordement.";
            let list_accord = [{
                "name": "<b>Accordeon Article #1</b>", "content": first + common
            }, {
                "name": "<b>Accordeon Article #2</b>", "content": second + common
            }, {
                "name": "<b>Accordeon Article #3</b>", "content": third + common
            }];
            index_accordion++;
            new Compo("accordion", index_accordion, "", list_accord);
        });
    }
}

function CreateButtonDirection(name, index) {
    let tab_action = document.querySelector("#tab_action");
    let button = document.createElement("button");
    button.classList.add("QComponent");
    button.innerText = name;
    button.addEventListener("click", () => {
        ActionButtonDirection(index)
    });
    tab_action.appendChild(button);
}

function CreateButtonsDirection() {
    CreateButtonDirection("Gauche", 0);
    CreateButtonDirection("Droite", 1);
    CreateButtonDirection("Haut", 2);
    CreateButtonDirection("Bas", 3);
}

function ActionButtonDirection(direction) {

    if (direction === 0) {// Gauche droite
        console.log("gauche")
    }
    if (direction === 1) {// Haut bas
        console.log("droite")
    }
    if (direction === 2) {// Haut bas
        console.log("haut")
    }
    if (direction === 3) {// Haut bas
        console.log("bas")
    }
    return true;
}

function swap() {
    let tab_action = document.querySelector("#tab_action");
    let nameparent = selectedParent.parentNode.className;
    let element = selectedParent.className;

    console.log(nameparent)
    switch (nameparent) {
        case "body":
            break;

        case "container":
            switch (element) {
                case 'row':
                    break;
                case 'col':
                    break;
                case 'col-4':
                    break;
                case 'col-8':
                    break;

            }

            break;

        case "row":
            break;
        case "col":
            break;
        case "col-4":
            break;
        case "col-8":
            break;
    }
}


function CreateButtons() {
    fetch("json/buttons.json")
        .then(response => response.json())
        .then(data => {
            let prop1 = data[0][0];
            let prop2 = data[1][0].list;
            let prop3 = data[2][0].list;
        });
}


function ClearProperties() {
    let div_id = document.getElementById('prop_id');
    let div_name = document.getElementById('prop_name');
    tab_property.innerHTML = text_prop + "...";
    div_id.value = "";
    div_name.value = "";
}

function GetProperties() {

    let div_id = document.getElementById('prop_id');
    let div_name = document.getElementById('prop_name');
    if (selectedParent) {
        let prop_id = selectedParent.getAttribute('id');
        let prop_name = selectedParent.getAttribute('name');

        if (prop_id == null) {
            prop_id = selectedParent.children[0].getAttribute('id');
            prop_name = selectedParent.children[0].getAttribute('name');
        }
        if (prop_id == null) {
            prop_id = selectedParent.children[1].getAttribute('id');
            prop_name = selectedParent.children[1].getAttribute('name');
        }

        if (prop_id)
            div_id.value = prop_id;
        if (prop_name)
            div_name.value = prop_name;
    } else {
        ClearProperties();
    }


}


/* gestion des focus */

/* premier article */
function FirstItem() {
    let count = selectedParent.parentElement.children.length;
    if (count > 0) {
        return selectedParent.parentElement.children[0];
    }
    return null;
}

/* dernier article */
function LastItem() {
    let count = selectedParent.parentElement.children.length;
    if (count > 0) {
        return selectedParent.parentElement.children[count - 1];
    }
    return null;
}

/* déplace le focus */
function MoveItem(direction) {

    if (selectedParent) {
        if (direction === 0) {
            if (selectedParent === LastItem()) {
                selectedParent = FirstItem();
            } else {
                selectedParent = selectedParent.nextElementSibling;
            }
        } else {
            if (selectedParent === FirstItem()) {
                selectedParent = LastItem();
            } else {
                selectedParent = selectedParent.previousElementSibling;
            }
        }
        selectedParent.click();
    }
}

function ParentFocus() {
    if (selectedParent.parentElement) {
        selectedParent = selectedParent.parentElement;
        selectedParent.click();
    }
}













