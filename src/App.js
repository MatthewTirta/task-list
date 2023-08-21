import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
	const [task, setTask] = useState([]);
	const [title, setTitle] = useState('');
	const [sum, setSum] = useState('');
	const [edit, setEdit] = useState(null);

	const [modal, setModal] = useState(false);

	const open = () => {
		if (modal) {
			setTitle('');
			setSum('');
		}
		setModal(!modal);
	};

	const addTask = () => {
		const newTask = {
			title,
			sum,
		};

		if (title !== '') {
			setTask([...task, newTask]);
			setTitle('');
			setSum('');
			open();
			toast.success('New task added!');
		}
	};

	const deleteTask = (index) => {
		const listBaru = [...task];
		listBaru.splice(index, 1);
		setTask(listBaru);
		toast.error('Task deleted!');
	};

	const editTask = (index) => {
		setEdit(index);
		setTitle(task[index].title);
		setSum(task[index].sum);
		open();
	};

	const saveChange = () => {
		const listBaru = [...task];
		listBaru[edit] = { title, sum };
		setTask(listBaru);
		setTitle('');
		setSum('');
		setEdit(null);
		open();
		toast.info('Task updated!');
	};

	return (
		<div className="container">
			<div className="main">
				<h1>Task List - Matthew</h1>
				{task.length === 0 && <p>You have no tasks</p>}
				{task.map((task, index) => (
					<div key={index} className="task-box">
						<div>
							<strong>{task.title}</strong>
							<p>{task.sum}</p>
						</div>
						<div className="button-container">
							<Button color="warning" onClick={() => editTask(index)}>
								Edit
							</Button>
							<Button color="danger" onClick={() => deleteTask(index)}>
								Delete
							</Button>
						</div>
					</div>
				))}
				<Button active block onClick={open}>
					New Task
				</Button>
			</div>
			<Modal isOpen={modal} toggle={open}>
				<ModalHeader open={open}>ADD NEW TASK</ModalHeader>
				<ModalBody>
					<h5>Title</h5>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<br />
					<h5>Summary</h5>
					<input
						type="text"
						className="form-control"
						value={sum}
						onChange={(e) => setSum(e.target.value)}
					/>
				</ModalBody>
				<ModalFooter>
					{edit !== null ? (
						<Button color="primary" onClick={saveChange}>
							Save Changes
						</Button>
					) : (
						<Button color="primary" onClick={addTask}>
							Add Task
						</Button>
					)}
					<Button color="danger" onClick={open}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<ToastContainer />
		</div>
	);
};

export default TaskList;
