
document.addEventListener('DOMContentLoaded' , function(){
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        const name = document.getElementById("name");
        const rating = document.getElementById('rating');
        const review = document.getElementById('review');

        //TODO
        fetch('/api/ ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            console.log(data);
            window.location.href = `/ /${data.id}`;
        })
        .catch(e => {
            console.error("errpr: ", e);
        });

    });


});