const _ = require("lodash");
const offers = require("./src/store/get_offers.js");

const o1 = { a: 1, b: 2, c: 2 },
    o2 = {
        result: [
            {
                latitude: -45.880806,
                longitude: -23.19806,
                objectId: "knoEojjyVT",
                name: "Teste ONG",
                description: [Object],
                distance: 3237.2616520038187,
            },
        ],
    };

joj = _.omit(offers, function (v, k) {
    return o2[k] === v;
});

console.log(joj);
