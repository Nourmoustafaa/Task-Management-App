/* eslint-disable react/prop-types */
import {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import taskSchema from './validation/taskSchema';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './TaskForm.css';
export default function TaskForm({ title,onSubmit, showModal, onClose,taskData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: taskData || {},
  });
  useEffect(() => {
    if (showModal) {
      reset(taskData || { title: '', description: '', priority: '', state: '', image: null });
    }
  }, [taskData,showModal,reset]);
  const handleFormSubmit = (data) => {
    if (data.image.length > 0) {
      data.image = data.image[0]; 
    }
    onSubmit(data);
    reset(); 
    onClose(); 
  };
  const handleModalClose = () => {
    taskData=null;
    reset();
    onClose(); 
  };
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body className="container">
          <div >
            <label><strong>Title</strong></label>
            <input type="text" {...register('title')} className="form-control" />
            <p className="text-danger">{errors.title?.message}</p>
          </div>

          <div>
            <label><strong>Description</strong></label>
            <textarea {...register('description')} className="form-control" />
            <p className="text-danger">{errors.description?.message}</p>
          </div>

          <div>
            <label><strong>Priority</strong></label>
            <select {...register('priority')} className="form-control">
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p className="text-danger">{errors.priority?.message}</p>
          </div>

          <div>
            <label><strong>State</strong></label>
            <select {...register('state')} className="form-control">
              <option value="">Select State</option>
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <p className="text-danger">{errors.state?.message}</p>
          </div>

          <div>
            <label><strong>Image</strong></label>
            <input type="file" {...register('image')} className="form-control" />
            <p className="text-danger">{errors.image?.message}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Task
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
