'use client';

import { useState } from 'react';

interface AddNoteFormProps {
	onAddNote: (title: string, content:string) => void;
	onCancel: () => void
}


const AddNoteForm: React.FC<AddNoteFormProps> = ({
	onAddNote,
	onCancel
}) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (title.trim() && content.trim()) {
				onAddNote(title.trim(), content.trim());
				setTitle('');
				setContent('');
			}
	};
	
	return (
		<div className="add-note-form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">
							Title
						</label>
							<input
								type="text"
								id="title"
								className="form-input"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Input title"
								/>
					</div>

					<div className="form-group">
						<label htmlFor="content">
							Content
						</label>
						<textarea
							id="content"
							className="form-input"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Input content"
							/>
					</div>

					<div className="form-actions">
						<button type="button" className="btn btn-secondary" onClick={onCancel}>
							Cancel
						</button>

						<button type="submit" className="btn btn-primary">
							Save
						</button>
					</div>
				</form>
			</div>
		)
};

export default AddNoteForm;