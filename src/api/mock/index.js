var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var mock = new MockAdapter(axios);
mock.onAny().reply(200, {
    users: [
        { id: 1, name: 'John Smith' }
    ]
});
console.log('11111') 

