const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
	process.env.SUPABASE_S3_URL,
	process.env.SUPABASE_S3_KEY,
);

async function upload(bucket, userId, file) {
	const { error } = await supabase.storage
		.from(bucket)
		.upload(userId, file.buffer, { upsert: true, contentType: file.mimetype });

	if (error) {
		return error;
	} else {
		const { data } = supabase.storage.from(bucket).getPublicUrl(userId);

		return data;
	}
}

async function remove(bucket, id) {
	const { error } = supabase.storage.from(bucket).remove([id]);

	if (!error) return true;

	throw new Error(error.message);
}

module.exports = {
	upload,
	remove,
};
