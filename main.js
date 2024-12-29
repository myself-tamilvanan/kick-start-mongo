import {connect} from "mongoose";
import schema from "./schema/index.js";

run();
async function run() {
  try {
    connect(
      "mongodb+srv://tamilvanan:Tamil%401995@kick-start-mongo.llle7.mongodb.net/?retryWrites=true&w=majority&appName=kick-start-mongo"
    );

    // const user = await schema.User.create({
    //   name: "JANE Doe",
    //   age: 30,
    //   email: "TEST1@gmail.com",
    //   address: {
    //     street: "123 Main St",
    //     city: "New York",
    //     state: "NY",
    //     zip: "10001",
    //   },
    //   hobbies: ["reading", "swimming", "coding"],
    //   bestFriend: "5f8e4b9f3d9d3d3b7c9f2b1e",
    // });

    // user.name = "John Doe";
    // user.save();

    const user = await schema.User.findById("677165ab27a4a730ba0f7d17");
    // user.populate("bestFriend");
    // user.bestFriend = "6771658ff32917418bdf49fe";
    // const user = await schema.User.find({name: "John Doe"});
    // const user = await schema.User.deleteOne({id: "677165ab27a4a730ba0f7d17"});
    // const user = await schema.User.where("name")
    //   .equals("John Doe")
    //   .where("age")
    //   .gte(50)
    //   .exec();

    // const user = await schema.User.findByAge(30);

    console.log(user);
    await user.save();
    console.log("User saved successfully", user);
  } catch (error) {
    console.error("Caught ERROR: ", error.message);
  }
}
