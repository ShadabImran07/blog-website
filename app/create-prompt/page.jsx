"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { v2 as cloudinary } from "cloudinary";
// import { connectToCoudnary } from "@utils/cloudnarSteup";

import Form from "@components/Form";

let cloudName = process.env.CLOUDINARY_CLOUD_NAME;

const CreatePrompt = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
		photo: null,
		video: null,
	});
	console.log(post.video);

	const createPrompt = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// const videoUpload = await cloudinary.uploader.upload(post.video);
			// const videoUrl = videoUpload.secure_url;
			// console.log(videoUrl);
			const formData = new FormData();
			formData.append("file", post.video);
			formData.append("upload_preset", "video-preset");
			const uploadResponse = await fetch(
				"https://api.cloudinary.com/v1_1/dwdpxjsqr/video/upload",
				{
					method: "POST",
					body: formData,
				}
			);
			const uploadedImageData = await uploadResponse.json();
			const videoUrl = uploadedImageData.secure_url;
			console.log(videoUrl);
			// let api = `https://api.cloudinary.com/v1_1/dwdpxjsqr/video/upload`;
			// const res = await axios.post(api, post.video);
			// const { secure_url } = res.data;
			// console.log(secure_url);
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
					image: post.photo,
					video: videoUrl,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
