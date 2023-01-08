/* input mask */

const masked = document.getElementsByClassName('masked');
const prefixed = document.getElementsByClassName('prefixed');


function setPrefixedInputListener(elem) {
    elem.addEventListener("blur", (evt) => {
        const input = evt.target;
        const prefix = input.dataset.prefix;
        if (prefix && input.value.length <= prefix.length) {
            input.value = "";
        }
    });

    elem.addEventListener("focus", (evt) => {
        const input = evt.target;
        const prefix = input.dataset.prefix;
        if (prefix && !input.value) {
            input.value = prefix;
        }
    });
}


function RefreshMasked() {
    for (let i = 0; i < masked.length; i++) {
        masked[i].addEventListener("input", (evt) => {
            const input = evt.target;

            const pattern = input.dataset.pattern;
            const prefix = input.dataset.prefix;

            let value;
            let startIndex = 0;
            let count = 0;
            let formatedValue = "";

            if (prefix) {
                startIndex = prefix.length;
                formatedValue += prefix;
                if (input.value.length < prefix.length) {
                    input.value = prefix;
                }
            }
            if (prefix && prefix === input.value.slice(0, prefix.length)) {
                value = input.value.replace(prefix, "").replace(/[^\d]/g, "");
            } else {
                value = input.value.replace(/[^\d]/g, "");
            }

            for (let i = startIndex; i < pattern.length; i++) {
                if (value[count]) {
                    if (pattern[i] !== "*") {
                        formatedValue += pattern[i];
                    } else {
                        formatedValue += value[count];
                        count++;
                    }
                }
            }
            input.value = formatedValue;
        });
    }
}

function RefreshPrefixed() {
    for (let i = 0; i < prefixed.length; i++) {
        setPrefixedInputListener(prefixed[i]);
    }
}


