
// Formulário de contato sem dependência de jQuery.
const contactForm = document.getElementById('myForm');
if (contactForm) {
    contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const response = await fetch('https://formsubmit.co/ajax/playlucas.hlz@gmail.com', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) throw new Error('Falha no envio');
            contactForm.reset();
            submitButton.textContent = 'Mensagem enviada!';
        } catch (error) {
            submitButton.textContent = 'Não foi possível enviar';
        } finally {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 3500);
        }
    });
}


//    trocar cor    //
const button1 = document.getElementById('change-colors-button-1');
const button2 = document.getElementById('change-colors-button-2');
const button3 = document.getElementById('change-colors-button-3');

button1.addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-color', '#000c20');
    document.documentElement.style.setProperty('--second-bg-color', '#112e42');
    document.documentElement.style.setProperty('--text-color', '#ededed');
    document.documentElement.style.setProperty('--main-color', '#00abf0');
});

button2.addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-color', '#FFF4EE');
    document.documentElement.style.setProperty('--second-bg-color', '#BA8475');
    document.documentElement.style.setProperty('--text-color', '#281713');
    document.documentElement.style.setProperty('--main-color', '#ff0000');
});

button3.addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-color', '#3F4A3C');
    document.documentElement.style.setProperty('--second-bg-color', '#A3AF9E');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--main-color', '#00FF00');
});



// header active nav //
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
            sec.classList.add("show-animate");
        } else {
            sec.classList.remove("show-animate");
        }
    });
});

// Adicione esse código para tornar o menu responsivo
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Permite abrir os projetos também pelo teclado.
document.querySelectorAll('.card[role="link"]').forEach(card => {
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});

// header sticks scroll //
window.addEventListener('scroll', () => {
    let header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 100);

    
    //    navbar responsivo remover quando clicar     //
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});



function openLinkInNewTab(url) {
    // Abre o link em uma nova guia
    window.open(url, '_blank');
}
