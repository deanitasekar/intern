'use client';

import { useEffect, useState } from 'react';
import { NoteType } from '../_types/note.type';


const UseNote = () => {
		const [notes, setNotes] = useState<NoteType[]>([]);
		const [searchTerm, setSearchTerm] = useState('');
		const [showAddForm, setShowAddForm] = useState(false);
	
		useEffect(() => {
			const sampleNotes: NoteType[] = [
				{
					id: 1,
					title: "Babel",
					content: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
				{
					id: 2,
					title: "Functional Component",
					content: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
				{
					id: 3,
					title: "Modularization",
					content: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
				{
					id: 4,
					title: "Lifecycle",
					content: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
				{
					id: 5,
					title: "ESM",
					content: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
				{
					id: 6,
					title: "Module Bundler",
					content: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
					createdAt: '2022-04-14T04:27:34.572Z',
					isArchived: false,
				},
			];
			setNotes(sampleNotes);
		}, []);
	
		const addNote = (title: string, content: string) => {
			const newNote: NoteType = {
				id: Date.now(),
				title,
				content,
				createdAt: new Date().toISOString(),
				isArchived: false
			};
			setNotes([newNote, ...notes]);
			setShowAddForm(false);
		};
	
		const archiveNote = (id: number) => {
			setNotes (notes.map(note => note.id === id ? { ...note, isArchived: true } : note));	
		}
	
		const unarchiveNote = (id: number) => {
			setNotes (notes.map(note => note.id === id ? { ...note, isArchived: false } : note));
		}
	
		const deleteNote = (id: number) => {
			setNotes (notes.filter(note => note.id !== id));
		};
	
		const filteredNotes = notes.filter(note => {
			const matchSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
			return matchSearch;
		});
	
		const activeNotes = filteredNotes.filter(note => !note.isArchived);
		const archivedNotes = filteredNotes.filter(note => note.isArchived);
	
	return {
		data:{
			notes,
			searchTerm,
			showAddForm,
			filteredNotes,
			activeNotes,
			archivedNotes
		},
		handler:{
			setSearchTerm,
			setShowAddForm,
			addNote,
			archiveNote,
			unarchiveNote,
			deleteNote,
		}
	}
}

export default UseNote;
