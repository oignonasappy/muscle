const inarea = document.getElementById('in');
const outarea = document.getElementById('out');

function autoResizeIn() {
    const currentHeight = inarea.offsetHeight;
    inarea.style.height = 'auto';
    const newHeight = inarea.scrollHeight;
    inarea.style.height = `${currentHeight}px`;

    if (currentHeight !== newHeight) {
        requestAnimationFrame(() => {
            inarea.style.height = `${newHeight}px`;
        });
    }
}

function autoResizeOut() {
    const currentHeight = outarea.offsetHeight;
    outarea.style.height = 'auto';
    const newHeight = outarea.scrollHeight;
    outarea.style.height = `${currentHeight}px`;

    if (currentHeight !== newHeight) {
        requestAnimationFrame(() => {
            outarea.style.height = `${newHeight}px`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inarea.style.height = `${inarea.scrollHeight}px`;
    outarea.style.height = `${outarea.scrollHeight}px`;
});

inarea.addEventListener('input', update);

function update() {
    let inTextArr = Array.from(inarea.value);
    let outText = "";
    let ptr = 0;
    let progress = 0;
    let muscleType = 0;
    const MUSCLE1 = [
        "魔っする", "魔ッスル",
        "魔する", "魔スル"
    ];
    const MUSCLE2 = [
        "魔uscle", "魔USCLE"
    ];
    const MUSCLE3 = [
        "魔ーする", "魔ースル",
        "魔ーっする", "魔ーッスル"
    ];
    while (ptr < inTextArr.length) {
        let found = false;
        if (progress !== 0) {
            if (muscleType === 1) {
                for (const str of MUSCLE1) {
                    if (progress < str.length && inTextArr[ptr] === str[progress]) {
                        found = true;
                        progress++;
                        break;
                    }
                }
                if (!found || ptr === inTextArr.length - 1) {
                    outText += "マッスル";
                    progress = 0;
                }
            } else if (muscleType === 2) {
                for (const str of MUSCLE2) {
                    if (progress < str.length && inTextArr[ptr] === str[progress]) {
                        found = true;
                        progress++;
                        break;
                    }
                }
                if (!found || ptr === inTextArr.length - 1) {
                    outText += "Muscle";
                    progress = 0;
                }
            } else if(muscleType === 3){
                for (const str of MUSCLE3) {
                    if (progress < str.length && inTextArr[ptr] === str[progress]) {
                        found = true;
                        progress++;
                        break;
                    }
                }
                if (!found || ptr === inTextArr.length - 1) {
                    outText += "マーッスル";
                    progress = 0;
                }
            }
        }
        if (progress === 0 && !found) {
            if (inTextArr[ptr] === 'ま' || inTextArr[ptr] === 'マ') {
                if (ptr + 1 < inTextArr.length && inTextArr[ptr + 1] === 'ー') {
                    muscleType = 3;
                    progress++;
                } else {
                    muscleType = 1;
                    progress++;
                    if (ptr === inTextArr.length - 1) {
                        outText += "マッスル";
                    }
                }
            } else if (inTextArr[ptr] === 'm' || inTextArr[ptr] === 'M') {
                muscleType = 2;
                progress++;
                if (ptr === inTextArr.length - 1) {
                    outText += "Muscle";
                }
            } else {
                outText += inTextArr[ptr];
            }
        }
        ptr++;
    }
    outarea.innerHTML = outText;

    autoResizeIn();
    autoResizeOut();
}

function clipboardCopy() {
    navigator.clipboard.writeText(outarea.value);
}