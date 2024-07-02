const myForm = document.querySelector('#signup');
const output = document.querySelector('.output');
output.style.display = 'none';
const url = 'https://script.google.com/macros/s/AKfycbzixdekR6BGrsr3DZaXsQxo_08Tm-EYa7mF6v9IeMboUZWhee0XhM6jhAoeBhvh1T11/exec';
myForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    const ele = myForm.elements;
    //console.log(ele);
    //console.log('Sending Data');
    const holder = {};
    const err = [];
    for (let i = 0; i < ele.length; i++) {
    //console.log(ele[i]);
        const el = ele[i];
        let val = true;
        if (el.getAttribute('type') == 'submit') {
            val = false;
        };
        if (el.name == 'user') {
            if (el.value.length < 5) {
                val = false;
                err.push('Name needs to be 5 or more');
            }
        }
        if (el.name == 'category') {
            if (el.value.length < 5) {
                val = false;
                err.push('Category needs to be 5 or more');
            }
        }
        if (el.name == 'proburl') {
            let check = validateEmail(el.value);
            console.log(check);
            if (!check) {
                val = false;
                err.push('Not valid email');
            }
        }
        if (val) {
            holder[el.name] = el.value;
        }
    }
    if (err.length > 0) {
        output.innerHTML = '';
        output.style.display = 'block';
        err.forEach(error => {
            output.innerHTML += '<div> ' + error + '</div>';
        })
    } else {
        //form submit
        console.log(holder);
        // container.style.display = 'none';
        output.style.display = 'block';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(holder)
        })
        .then(rep => rep.json())
        .then(data => {
            console.log(data);
            // clearForm();
        })
    }
    })
function clearForm() {
    const ele = myForm.elements;
    output.style.display = 'none';
    output.innerHTML = '';
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].getAttribute('type') != 'submit') {
            ele[i].value = '';
        }
    }
}
function validateEmail(proburl) {
    const re = /\S+\.\S+/;
    return re.test(proburl);
}
