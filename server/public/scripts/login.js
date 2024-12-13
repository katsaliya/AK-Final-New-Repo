import { application, json } from "express";

document.querySelector( 'DOMContentLoaded',(req, res) => {

    const button = document.querySelector('#createdAccount');
    button.addEventListener('click', function(event) {
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/auth/users' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user, password}),
        }).then(res => {
            return res.json();
        })
        .then( data => {
            console.log(data);
        })
        .catch( e=> {
            console.log('error: ', e);
        });
    });

    const form = document.querySelector('#loginForm');

    form.addEventListener('submit' , function (event){

        event.preventDefault();

        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/auth/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user, password}),
        }).then(res => {
            return res.json();
        })
        .then( data => {
            console.log(data);
        })
        .catch( e=> {
            console.log('error: ', e);
        });
    }); 

});

