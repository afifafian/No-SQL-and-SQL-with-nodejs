const UserModel = require("../models/userModel");
const FormUser = require("../dto/request/formUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

class UserControllers {
  static async register(req, res, next) {
    try {
      const input = new FormUser();

      Object.keys(input).forEach((key) => {        
        if (req.body.hasOwnProperty(key)) {
          if (!_.isEmpty(req.body[key])) {
            input[key] = req.body[key];
          }
        }
      });

      // CHECK UNIQUE EMAIL ADDRESS
      const getUser = await UserModel.findOne({ Email: input.Email });
      if (!_.isEmpty(getUser)) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: "This Email address is already used!"
        };
      }

      const createUser = await UserModel.createOne(input);

      return res.status(201).json({
        message: "Successfully register!",
        data: createUser,
        request: {
          type: "POST",
          url: `/users/register`
        }
      });
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { Email, Password } = req.body;
      const getUser = await UserModel.findOne({ Email });
      
      if (_.isEmpty(getUser)) {
        throw {
          name: "Custom_Error",
          status: 401,
          message: "Email is not registered!"
        };
      } else if (!bcrypt.compareSync(Password, getUser.Password)) {
        throw {
          name: "Custom_Error",
          status: 401,
          message: "Wrong Password!"
        };
      } else {
        const token = jwt.sign(
          {
            id: getUser._id,
            name: getUser.Nama,
            email: getUser.Email,
            userID: getUser.userID
          },
          process.env.JWT_KEY,
          {
            expiresIn: process.env.JWT_TOKENLIFE
          }
        );
      
        return res.status(200).json({
          message: "Successfully login!",
          token: token,
          request: {
            type: "POST",
            url: "/users/login"
          }
        })
      }
    } catch (err) {
      next(err)
    }
  }

  static async findAll(req, res, next) {
    try {
      const fetchUsers = await UserModel.findAll();
      
      return res.status(200).json({
        message: "Successfully fetch User Data!",
        results: fetchUsers,
        request: {
          type: "GET",
          url: `/card`
        }
      })
    } catch (err) {
      next(err)
    }
  }

  static async findOne(req, res, next) {
    try {
      const emailUser = req.query.email;
      const getUser = await UserModel.findOne({ Email: emailUser });

      if (_.isEmpty(getUser)) {
        throw {
          name: "Custom_Error",
          status: 401,
          message: "Can't find User Data!"
        };
      }

      return res.status(200).json({
        message: "Successfully Fetch User Detail!",
        result: getUser,
        request: {
          type: "GET",
          url: `/users/detail?email=${emailUser}`
        }
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserControllers;
