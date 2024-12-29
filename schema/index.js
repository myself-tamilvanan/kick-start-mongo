import {Schema, model} from "mongoose";
import {type} from "os";

const schemaAddress = new Schema({
  street: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: String},
});

const schemaUser = new Schema({
  name: {type: String, required: true, minLength: 3, maxLength: 50, trim: true},
  age: {type: Number, min: 18, max: 65},
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    lowercase: true,
  },
  address: {
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
  },
  bestFriend: {type: Schema.Types.ObjectId},
  hobbies: [{type: [String]}],
  address: schemaAddress,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

schemaUser.methods.hello = function () {
  console.log(`Hello, my name is ${this.name}`);
};

schemaUser.methods.getFullName = function () {
  return this.name;
};

schemaUser.statics.findByAge = function (age) {
  return this.find({age});
};

schemaUser.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

schemaUser.query.byName = function (name) {
  return this.where({name: new RegExp(name, "i")});
};

schemaUser.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

schemaUser.post("save", function (doc) {
  doc.hello();
});

const User = model("User", schemaUser);

export default {User};
