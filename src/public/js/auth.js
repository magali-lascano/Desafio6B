const formRegister = document.querySelector("#formRegister")?document.querySelector("#formRegister"):null;
const formLogin = document.querySelector("#formLogin")?document.querySelector("#formLogin"):null;

formLogin?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = `/api/auth/login`;
    const formData = new FormData(e.target);
    const formDataJSON = {};
    
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    if(response.status === 200){
        Swal.fire({
            icon: 'success',
            title: 'Usuario logueado con exito!',
            text: result.message
        }).then(() => {
            location.href = "/view/products";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error al intentar loguearse!',
            text: result.error
        });
    }
});

formRegister?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = `/api/auth/register`;
    const formData = new FormData(e.target);
    const formDataJSON = {};
    
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    if(response.status === 200){
        Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: result.message
        }).then(() => {
            location.href = "/view/login";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Se ha producido un error',
            text: result.error
        });
    }
});