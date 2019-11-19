var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
function getter(person) {
    return 'hello, ' + person.firstName + ' ' + person.lastName;
}
var user = new Student('corleone', 'M.', 'long');
document.body.innerHTML = getter(user);
