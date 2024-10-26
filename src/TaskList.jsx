/* eslint-disable react/prop-types */
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Badge ,Button} from 'react-bootstrap';

const TaskList = ({ tasks = [], onEdit, onDelete, onDragEnd }) => {
  const tasksByState = {
    todo: tasks.filter(task => task.state === 'todo'),
    doing: tasks.filter(task => task.state === 'doing'),
    done: tasks.filter(task => task.state === 'done'),
  };
  function getBadgeVariant(priority) {
    switch (priority) {
      case 'High':
        return 'danger'; 
      case 'Medium':
        return 'warning'; 
      case 'Low':
        return 'success'; 
      default:
        return 'secondary'; 
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row">
        {['todo', 'doing', 'done'].map((state) => (
          <div key={state} className="col">
            <h3><strong>{state.charAt(0).toUpperCase() + state.slice(1)}</strong></h3>
            <Droppable droppableId={state}>
              {(provided) => (
                <div
                   className='droppable-col'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ minHeight: '600px',width:"410px",background: '#f0f0f0', padding: '10px' }}
                >
                  {tasksByState[state].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card mb-3"
                          style={{ width: '100%' }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">{task.title}</h5> 
                            <Badge className="card-title me-2">{task.state}</Badge>
                            <Badge bg={getBadgeVariant(task.priority)} className="card-title">{task.priority}</Badge>
                            <hr></hr>
                            <p className="card-text">{task.description}</p>
                            {task.image && (
                              <img src={URL.createObjectURL(task.image)} alt="Task" style={{ width: '100%' }} />
                            )}
                            <div >
                              <Button variant="success" onClick={() => onEdit(task)}>Edit</Button>
                              <Button variant="danger"className="btn m-2" onClick={() => onDelete(task.id)}>Delete</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
