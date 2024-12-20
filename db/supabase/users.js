const supabase = require("./setup.js");
const User = require("../../models/User.js");

const TABLE = "users";

const getAllUsers = async () => {
	const { data, error } = await supabase
		.from(TABLE)
		.select()
		.order("created_at", { ascending: false });

	if (!error) return data;

	throw error;
};

const getUserById = async (id) => {
	const { data, error } = await supabase
		.from(TABLE)
		.select()
		.eq("id", id)
		.select();

	if (!error) return data;

	throw error;
};

const createUser = async (userData) => {
	const user = new User(userData);

	const { data, error } = await supabase.from(TABLE).insert(user).select();

	if (!error) return Object.values(data);

	throw error;
};

const updateUser = async (id, userData) => {
	const { data, error } = await supabase
		.from(TABLE)
		.update(userData)
		.eq("id", id)
		.select();

	if (!error) return data;

	throw error;
};

const deleteUser = async (id) => {
	const { error } = await supabase.from(TABLE).delete().eq("id", id);

	if (!error) return true;

	throw error;
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
