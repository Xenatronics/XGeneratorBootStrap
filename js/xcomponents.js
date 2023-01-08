class QLabel {
    constructor(name, parent, classname = "QLabel") {
        this.callback = null;
        this.name = name;
        this.parent = parent;
        this.div = document.createElement('div');
        this.parent.append(this.div);
        this.div.classList.add(classname);
        this.div.innerHTML = this.name;
    }

    setCallBack(f) {
        this.callback = f;
        this.div.addEventListener('click', this.callback, false);
    }

    getDiv() {
        return this.div;
    }

}


class NavBar {
    constructor(name, parent, id = 1) {
        this.name = name;
        this.id = id;
        this.nav = document.createElement("nav");
        parent.append(this.nav);
        this.nav.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light");
        this.nav.classList.add("compo_proto");
        this.nav.setAttribute("id", "id_navbar" + id);
        this.nav.setAttribute("type", this.name);
        this.nav.setAttribute("name", this.name);
        this.container = document.createElement("div");
        this.container.classList.add('container-fluid');
        this.nav.append(this.container);
    }

    getRoot() {
        return this.container;
    }
}

class HamburgerMenu {
    constructor(name, parent, id) {
        this.name = name;
        this.button=document.createElement("button");
        this.button.classList.add("navbar-toggler");
        this.button.setAttribute("data-bs-toggle", "collapse");
        this.button.setAttribute("data-bs-target", "#"+id);
        this.span=document.createElement("span");
        this.span.classList.add("navbar-toggler-icon");
        parent.append(this.button);
        this.button.append(this.span);
    }
    getRoot() {
        return this.button;
    }
}

class MenuCollapse{
    constructor(name, parent, id) {
        this.name = name;
        this.id = id;
        this.nav_collapse = document.createElement("div");
        this.nav_collapse.setAttribute("id",id);
        this.nav_collapse.classList.add("collapse navbar-collapse");
        parent.append(this.nav_collapse);
    }
    getRoot() {
        return this.nav_collapse;
    }
}


class Link {
    constructor(name, parent, id, target = "#", value = "") {
        this.name = name;
        this.id = id;
        this.target = target;
        this.link = document.createElement("a");
        this.li = document.createElement("li");
        parent.append(this.li);
        this.li.append(this.link);
        this.link.setAttribute("href", this.target);
        if (parent.parent.name === "nav-item") {
            this.link.classList.add("navbar-link");
        }
        if (parent.parent.name === "dropdown-menu") {
            this.link.classList.add("dropdown-item");
        }
        if (parent.name === "container-fluid") {
            this.link.classList.add("navbar-brand");
        }
        this.link.setAttribute("id", "id_link" + id);
        this.link.setAttribute("type", this.name);
        this.link.setAttribute("name", this.name);
        this.link.innerHTML = value;
    }

    getRoot() {
        return this.link;
    }
}

class NavItemRoot {
    constructor(name, parent, id , target = "#", option = "") {
        this.name = name;
        this.id = id;
        this.target = target;
        this.navitemroot = document.createElement("ul");
        parent.append(this.navitemroot);
        this.navitemroot.classList.add("navbar-nav me-auto mb-2 mb-lg-0", option);
    }

    getRoot() {
        return this.navitemroot;
    }
}

class NavItem {
    constructor(name, parent, id = 1, target = "#", option = "") {
        this.name = name;
        this.id = id;
        this.target = target;
        this.navitem = document.createElement("li");
        parent.append(this.navitem);
        this.navitem.classList.add("nav-item", option);
    }

    getRoot() {
        return this.navitem;
    }
}

class DropDownMenu {
    constructor(name, parent, id = 1, option = "") {
        this.name = name;
        this.id = id;
        this.dropmenu = document.createElement("ul");
        parent.append(this.dropmenu);
        this.dropmenu.classList.add("dropdown-menu", option);
    }

    loadMenu(list_menu: Array = []) {
        list_menu.forEach(elem => {
                console.log(elem);
            }
        )
    }

    getRoot() {
        return this.dropmenu;
    }
}