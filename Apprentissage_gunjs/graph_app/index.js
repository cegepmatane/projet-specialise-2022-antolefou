import GUN from "gun";
let gun = GUN();

let alice = gun.get('alice').put({name: 'alice', age: 22});
let bob = gun.get('bob').put({name: 'bob', age: 24});
let carl = gun.get('carl').put({name: 'carl', age: 16});
let dave = gun.get('dave').put({name: 'dave', age: 42});

// alice.on(function(node){
//     console.log('Subscribed to Alice!', node);
// });
//
// gun.get('bob').once(function(node){
//     console.log('Bob name', node);
// });

let people = gun.get('people');
people.set(alice);
people.set(bob);
people.set(carl);
people.set(dave);

// people.map().once(function(person){
//     console.log("The person is", person);
// });


let company = gun.get('startup').put({
    name: "hype",
    profitable: false,
    address: {
        street: "123 Hipster Lane",
        city: "San Francisco",
        state: "CA",
        country: "USA"
    }
});

company.get('address').get('city').once(function(value, key){
    console.log("What is the city?", value);
});

gun.get('startup').put({ // or you could do `company.put({` instead.
    funded: true,
    address: {
        city : "gif sur yvette",
        street: "999 Expensive Boulevard"
    }
});

company.get('address').get('city').once(function(value, key){
    console.log("What is the city?", value);
});

let employees = company.get('employees');
employees.set(dave);
employees.set(alice);
employees.set(bob);

alice.get('spouse').put(bob);
bob.get('spouse').put(alice);

alice.get('spouse').get('employer').put(company);
alice.get('employer').put(company);

dave.get('kids').set(carl);
carl.get('dad').put(dave);

carl.get('friends').set(alice);
carl.get('friends').set(bob);

gun.get('alice').get('spouse').get('employer').get('employees').map().get('name').once(function(data, key){
    console.log("The employee's", key, data);
});