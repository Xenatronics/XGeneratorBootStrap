/* ============================================
 * Pure Mask JS: puremask.js v1.0
 * https://romulobrasil.com
 * Copyright (c) 2016-2022 Rômulo Brasil
 * ============================================
 */
const PureMask = {
    logs: {
        element: 'PureMask.js: favor declarar o elemento que vai receber a mascara.',
        mask: 'PureMask.js: data-mask não foi declarada na tag com a class.',
    },
    format(element, placeholder) {
        const els = document.querySelector(element);
        if (!els) {
            console.log(this.logs['element']);
        } else if (!els.dataset.mask) {
            console.log(this.logs['mask']);
        } else {
            Array.from(els.parentElement).forEach(el => {
                if (placeholder) {
                    el.placeholder = el.dataset.mask;
                }
                el.addEventListener('keydown', e => {
                    if (e.keyCode !== 8 || e.keyCode !== 46) {
                        this.applyMaskToValue(el, el.dataset.mask);
                    }
                });
            });
        }
    },
    applyMaskToValue(el, mask) {
        let txt = '';
        let c, m;

        for (let i = 0, x = 1; x && i < mask.length - 1; ++i) {
            c = el.value.charAt(i);
            m = mask.charAt(i);

            switch (mask.charAt(i)) {
                case '#' :
                    if (/\d/.test(c)) {
                        txt += c;
                    } else {
                        x = 0;
                    }
                    break;
                case '_' :
                    if (/\d/.test(c)) {
                        txt += c;
                    } else {
                        x = 0;
                    }
                    break;
                case 'A' :
                    if (/[a-z]/i.test(c)) {
                        txt += c;
                    } else {
                        x = 0;
                    }
                    break;
                case 'N' :
                    if (/[a-z0-9]/i.test(c)) {
                        txt += c;
                    } else {
                        x = 0;
                    }
                    break;
                case 'X' :
                    txt += c;
                    break;
                default  :
                    txt += m;
                    break;
            }
        }
        el.value = txt;
    },
}