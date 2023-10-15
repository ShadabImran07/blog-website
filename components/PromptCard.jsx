// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import ReactPlayer from "react-player";

// const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
// 	const { data: session } = useSession();
// 	const pathName = usePathname();
// 	const router = useRouter();

// 	const [copied, setCopied] = useState("");

// 	const handleProfileClick = () => {
// 		if (post.creator._id === session?.user.id) return router.push("/profile");

// 		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
// 	};

// 	const handleCopy = () => {
// 		setCopied(post.prompt);
// 		navigator.clipboard.writeText(post.prompt);
// 		setTimeout(() => setCopied(false), 3000);
// 	};
// 	console.log("post.prompt", post);

// 	return (
// 		<div className='prompt_card'>
// 			<div className='flex justify-between items-start gap-5'>
// 				<div
// 					className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
// 					onClick={handleProfileClick}
// 				>
// 					<Image
// 						src={post.creator.image}
// 						alt='user_image'
// 						width={40}
// 						height={40}
// 						className='rounded-full object-contain'
// 					/>

// 					<div className='flex flex-col'>
// 						<h3 className='font-satoshi font-semibold text-gray-900'>
// 							{post.creator.username}
// 						</h3>
// 						<p className='font-inter text-sm text-gray-500'>
// 							{post.creator.email}
// 						</p>
// 					</div>
// 				</div>

// 				<div
// 					className='copy_btn'
// 					onClick={handleCopy}
// 				>
// 					<Image
// 						src={
// 							copied === post.prompt
// 								? "/assets/icons/tick.svg"
// 								: "/assets/icons/copy.svg"
// 						}
// 						alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
// 						width={12}
// 						height={12}
// 					/>
// 				</div>
// 			</div>

// 			<p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>

// 			<div className="className='w-full h-100 object-cover mt-2 filter hover:grayscale">
// 				<Image
// 					src={post.image}
// 					alt='blog-image'
// 					width={200}
// 					height={200}
// 				/>
// 			</div>

// 			<div>
// 				<ReactPlayer
// 					url={post.videoUrl}
// 					controls={true}
// 				/>
// 			</div>

// 			<p
// 				className='font-inter text-sm blue_gradient cursor-pointer'
// 				onClick={() => handleTagClick && handleTagClick(post.tag)}
// 			>
// 				#{post.tag}
// 			</p>

// 			{session?.user.id === post.creator._id && pathName === "/profile" && (
// 				<div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
// 					<p
// 						className='font-inter text-sm green_gradient cursor-pointer'
// 						onClick={handleEdit}
// 					>
// 						Edit
// 					</p>
// 					<p
// 						className='font-inter text-sm orange_gradient cursor-pointer'
// 						onClick={handleDelete}
// 					>
// 						Delete
// 					</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default PromptCard;

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ReactPlayer from "react-player";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState("");

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<div className='prompt_card bg-white p-4 rounded-lg shadow-md'>
			<div className='flex justify-between items-start gap-5'>
				<div
					className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
					onClick={handleProfileClick}
				>
					<Image
						src={post.creator.image}
						alt='user_image'
						width={40}
						height={40}
						className='rounded-full object-contain'
					/>

					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>
							{post.creator.username}
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							{post.creator.email}
						</p>
					</div>
				</div>

				<div
					className='copy_btn'
					onClick={handleCopy}
				>
					<Image
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>

			<div className='w-full h-100 object-cover mt-2 filter hover:grayscale'>
				<Image
					src={post.image}
					alt='blog-image'
					width={200}
					height={200}
				/>
			</div>

			{post.videoUrl && (
				<div className='mt-4'>
					<ReactPlayer
						url={post.videoUrl}
						controls={true}
						width='100%'
					/>
				</div>
			)}

			<p
				className='font-inter text-sm blue_gradient cursor-pointer'
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</p>

			{session?.user.id === post.creator._id && pathName === "/profile" && (
				<div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
					<p
						className='font-inter text-sm green_gradient cursor-pointer'
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className='font-inter text-sm orange_gradient cursor-pointer'
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
