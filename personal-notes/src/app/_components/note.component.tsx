import { NoteType } from "../_types/note.type";

interface NoteCardProps {
	note: NoteType;
	onArchive: (id: number) => void;
	onUnarchive: (id: number) => void;
	onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
	note,
	onArchive,
	onUnarchive,
	onDelete,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("id-ID", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className={`note-card ${note.isArchived ? "archived" : ""}`}>
			<div className="note-header">
				<h3 className="note-title">{note.title}</h3>

				<span className="note-date">{formatDate(note.createdAt)}</span>
			</div>

			<div className="note-content">{note.content}</div>

			<div className="note-actions">
				{note.isArchived ? (
					<button
						className="action-btn unarchive"
						onClick={() => onUnarchive(note.id)}
						title="Unarchive"
					>
						Unarchive
					</button>
				) : (
					<button
						className="action-btn archive"
						onClick={() => onArchive(note.id)}
						title="Archive"
					>
						Archive
					</button>
				)}

				<button
					className="action-btn delete"
					onClick={() => onDelete(note.id)}
					title="Delete"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default NoteCard;
