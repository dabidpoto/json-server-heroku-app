const fs = require("fs");
const faker = require("@faker-js/faker/locale/en_US");

let employees = [];

for (let i = 1; i <= 1000; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const state = faker.address.state();
  employees.push({
    name: faker.name.findName(firstName, lastName),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: state,
      zipCode: faker.address.zipCodeByState(state)
    },
    email: faker.internet.email(firstName, lastName),
    id: i,
    company: faker.company.companyName(),
    jobTitle: faker.name.jobTitle(),
    phone: faker.phone.phoneNumber("555-###-####"),
    vehicle: {
      vehicle: faker.vehicle.vehicle(),
      color: faker.vehicle.color(),
      fuel: faker.vehicle.fuel(),
      vin: faker.vehicle.vin()
    },
    account: {
      name: faker.finance.accountName(),
      number: faker.finance.account(),
      routing_number: faker.finance.routingNumber(),
      amount: faker.finance.amount(1000, 100000, 2, "$", true),
      cc_issuer: faker.finance.creditCardIssuer(),
      cc_number: faker.finance.creditCardNumber(),
      cc_cvv: faker.finance.creditCardCVV(),
      pin: faker.finance.pin(4)
    },
    favorite_animal: faker.animal.type()
  });
}

const data = {
  employees
};

fs.writeFile("src/db/db.json", JSON.stringify(data, null, 2), (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log("Created database at src/db/db.json");
  }
});
