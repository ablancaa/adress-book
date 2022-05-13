const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chance = require("chance").Chance();

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let addressList = [];

for (let i = 0; i < 20; i++) {
  addressList.push({
    id: chance.guid(),
    name: chance.name(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip(),
    country: chance.country(),
    phone: chance.phone(),
    email: chance.email(),
    private: chance.bool(),
  });
}

const loginUser = {
  tokenId: chance.guid(),
  name: chance.name(),
  lastName: chance.last(),
  email: chance.email({ domain: "addressapi.com" }),
  password: chance.string({ length: 10 }),
};

let address = {
  id: null,
  name: null,
  lastName: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  country: null,
  phone: null,
  email: null,
  private: null,
};

let response = {
  error: false,
  code: 200,
  message: "",
};
app.get("/", function (req, res) {
  response = {
    error: true,
    code: 200,
    message:
      "API REST working. You can use /login /address or /addresses endpoints",
  };
  res.send(response);
});
app.route("/login").post(function (req, res) {
  if (
    req.body.email === loginUser.email &&
    req.body.password === loginUser.password
  ) {
    response = {
      error: false,
      code: 200,
      message: "Login success",
      data: {
        email: loginUser.email,
        name: loginUser.name,
        lastName: loginUser.lastName,
        tokenId: loginUser.tokenId,
      },
    };
  } else {
    response = {
      error: true,
      codigo: 401,
      mensaje: "Login failed",
    };
  }
  res.send(response);
});
app.route("/addresses").get(function (req, res) {
  if (req.headers.authorization === loginUser.tokenId) {
    response = {
      error: false,
      code: 200,
      message: "Addresses list",
      data: addressList,
    };
  } else {
    response = {
      error: false,
      code: 200,
      message: "Addresses list",
      data: addressList.filter((address) => address.private === false),
    };
  }
  res.send(response);
});
app
  .route("/address")
  .get(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (!req.body.id) {
        response = {
          error: true,
          code: 400,
          message: "Id is required",
        };
      } else {
        address = addressList.find((address) => address.id === req.body.id);
        if (address) {
          response = {
            error: false,
            code: 200,
            message: "Address found",
            data: address,
          };
        } else {
          response = {
            error: true,
            code: 404,
            message: "Address not found",
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  })
  .post(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (
        !req.body.id ||
        !req.body.name ||
        !req.body.lastName ||
        !req.body.email
      ) {
        response = {
          error: true,
          code: 400,
          message: "Id, name, lastName and email are required",
        };
      } else {
        address = addressList.find((address) => address.id === req.body.id);
        if (address) {
          response = {
            error: true,
            code: 409,
            message: "Address already exists",
          };
        } else {
          address = {
            id: req.body.id,
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            private: req.body.private,
          };
          addressList.push(address);
          response = {
            error: false,
            code: 200,
            message: "Address created",
            data: address,
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  })
  .delete(function (req, res) {
    if (req.headers.authorization === loginUser.tokenId) {
      if (!req.body.id) {
        response = {
          error: true,
          code: 400,
          message: "Id is required",
        };
      } else {
        address = addressList.find((address) => address.id === req.body.id);
        if (address) {
          addressList = addressList.filter(
            (address) => address.id !== req.body.id
          );
          response = {
            error: false,
            code: 200,
            message: "Address deleted",
          };
        } else {
          response = {
            error: true,
            code: 404,
            message: "Address not found",
          };
        }
      }
    } else {
      response = {
        error: true,
        code: 401,
        message: "Unauthorized",
      };
    }
    res.send(response);
  });
app.use(function (req, res) {
  response = {
    error: true,
    codigo: 404,
    mensaje: "URL not found",
  };
  res.status(404).send(response);
});
app.listen(port, () => {
  console.log("Server started. Port 3000");
  console.log("Login user created");
  console.log("email: " + loginUser.email);
  console.log("password: " + loginUser.password);
});
