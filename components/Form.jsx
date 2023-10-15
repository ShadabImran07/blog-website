import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	const TransformFile = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setPost({ ...post, photo: reader.result });
			};
		} else {
			setPost({ ...post, photo: "" });
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		TransformFile(file);
	};

	const handleVideoChange = async (e) => {
		const file = e.target.files[0];
		setPost({ ...post, video: file });
	};

	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{type} Blog</span>
			</h1>
			<p className='desc text-left max-w-md'>
				{type} and share amazing blog with the world.
			</p>

			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Your Title
					</span>

					<input
						type='text'
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						placeholder='Write your post here'
						required
						className='form_textarea '
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Image
					</span>

					<input
						type='file'
						accept='image/*'
						// value={post.photo}
						onChange={handleImageChange}
						placeholder='Upload your image here'
						required
						className='form_textarea '
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Video
					</span>

					<input
						type='file'
						accept='video/*'
						// value={post.photo}
						onChange={handleVideoChange}
						placeholder='Upload your video here'
						required
						className='form_textarea '
					/>
				</label>

				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Field of comment{" "}
						<span className='font-normal'>(#nice, #good, #idea, etc.)</span>
					</span>
					<input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						type='text'
						placeholder='#Tag'
						required
						className='form_input'
					/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-4'>
					<Link
						href='/'
						className='text-gray-500 text-sm'
					>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
