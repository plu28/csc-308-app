import mongoose from "mongoose"

// we're creating a schema for what a user object should look like
const UserSchema = new mongoose.Schema(
	{
		name: {
			// attributes of the name 
			type: String,
			required: true,
			trim: true,
		},
		job: {
			type: String,
			required: true,
			trim: true,
			// extra validate function ?
			validate(value) {
				if (value.length < 2)
					throw new Error("Invalid job, must be at least 2 characters.")
			},
		},
	},
	// i dont know what this is
	{ collection: "users_list" }
);

// are we converting the users schema variable to a mongoose model object named User? 
const User = mongoose.model("User", UserSchema);

// exporting the User object we just made.
export default User;
