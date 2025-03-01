function message(){
    var Name = document.getElementById('name');
    var Phone = document.getElementById('phone');
    var Income = document.getElementById('income');
    var email = document.getElementById("email");
    const success = document.getElementById('success');
    const danger = document.getElementById('danger');

    if(Name.value === '' || email.value === '' || Income.value === '' || Phone.value === ''){
        danger.style.display = 'block';
    }
    else{
        setTimeout(() => {
            Name.value = '';
            Phone.value = '';
            Income.value = '';
            email.value = '';
        }, 2000);

        success.style.display = 'block';
    }


    setTimeout(() => {
        danger.style.display = 'none';
        success.style.display = 'none';
    }, 4000);

}