import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { v2 as cloudinary } from "cloudinary";

export const POST = async (request) => {
	const { userId, prompt, tag, image, video } = await request.json();
	console.log("for video ", video);
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		await connectToDB();
		const photoUrl = await cloudinary.uploader.upload(image);
		const imageUrl = photoUrl.secure_url;
		console.log("photo", imageUrl);
		const newPrompt = await Prompt.create({
			creator: userId,
			prompt,
			tag,
			image: imageUrl,
			videoUrl: video,
		});

		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log("Error creating a new prompt: ", error);
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};
