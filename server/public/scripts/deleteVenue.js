document.addEventListener('DOMContentLoaded', function(){
    const container = document.querySelector('.container');
    const buttons = document.querySelector('button');
    for(let button of buttons){
        button.addEventListener('click', function(event){
            let venueId = button.id.split("-")[1];
            //TODO
            fetch(`/api/ /${venueId}` , {
                method: 'DELETE',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(e => {
                console.log('error: ', e);
            });
        });
    }
});