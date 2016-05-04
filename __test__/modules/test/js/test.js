var person = {
    firstname: 'John',
    lastname: 'Doe',
    age: 50,
    eyecolor: 'blue'
};

if (document.getElementById('demo')) {
    document.getElementById('demo').innerHTML = person['firstname'] + ' is ' + person['age'] + ' years old.';
}
