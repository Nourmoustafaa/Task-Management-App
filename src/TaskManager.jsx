import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './TaskManager.css';
import { Modal, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from './TaskReducer';
const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({ state: null, priority: null }); 
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const stateOptions = [
    { value: null, label: 'All States' }, 
    { value: 'todo', label: 'To-Do' },
    { value: 'doing', label: 'Doing' },
    { value: 'done', label: 'Done' },
  ];

  const priorityOptions = [
    { value: null, label: 'All Priorities' }, 
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterOptions.state === null || task.state === filterOptions.state) &&
    (filterOptions.priority === null || task.priority === filterOptions.priority)
  );

  const handleTaskSubmit = (data) => {
    const newTask = { id: Date.now(), ...data };
    if (taskToEdit) {
        dispatch(updateTask({ ...taskToEdit, ...data }));
      } else {
        dispatch(addTask(newTask));
      }
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    
    setTaskToEdit(task);
    setIsModalOpen(true);
    
  };
  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      dispatch(deleteTask({ id: taskToDelete }));
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };
  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    const task = tasks.find(task => task.id.toString() === result.draggableId);
    const updatedTask = { ...task, state: destination.droppableId };
    dispatch(updateTask(updatedTask));
  };

  const openModal = () => {setIsModalOpen(true);}
  const closeModal = () => {setIsModalOpen(false); }
 
  return (
    <div className="container">

      <Card className="d-flex justify-content-between align-items-center p-2 mt-4 mb-4">
        <input
          className="form-control search-bar"
          type="search"
          placeholder="Search By Task Name"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          className="filter-dropdown w-20 select-input"
          options={stateOptions}
          onChange={(selected) => setFilterOptions({ ...filterOptions, state: selected ? selected.value : null })} 
          value={stateOptions.find(option => option.value === filterOptions.state) || null} 
        />

        <Select
          className="filter-dropdown w-20 select-input"
          options={priorityOptions}
          onChange={(selected) => setFilterOptions({ ...filterOptions, priority: selected ? selected.value : null })} 
          value={priorityOptions.find(option => option.value === filterOptions.priority) || null} 
        />

        <button type="button" className="btn btn-primary" onClick={()=>{setTaskToEdit(null);openModal();}}>
          New Task
        </button>
      </Card>

      <TaskForm title={taskToEdit ? "Edit Task" : "New Task"} onSubmit={handleTaskSubmit} showModal={isModalOpen} onClose={closeModal} taskData={taskToEdit} />
      <TaskList tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onDragEnd={onDragEnd} />

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDeleteTask}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default TaskManager;
