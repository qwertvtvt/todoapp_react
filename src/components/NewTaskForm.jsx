import { useEffect, useState } from 'react'

function NewTaskForm({ service, onTaskAdded }) {
    let [ newTaskName, setNewTaskName ] = useState("");
    let [ newTaskDeadline, setNewTaskDeadline ] = useState("");

    const submit = async () => {
        await service.addTask(newTaskName, newTaskDeadline);
        setNewTaskName("");
        setNewTaskDeadline("");
        onTaskAdded();
    }

    return (
        <>
            <div className="input-group">
                <div className="flex-grow-1">
                <label className="form-label">タスク</label>
                <input type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    onKeyDown={(e) => {
                    if(e.key == "Enter") submit();
                    }}
                    className='form-control'
                />
                </div>
                <div>
                <label className="form-label">期限</label>
                <input type='date' value={newTaskDeadline} onChange={(e) => setNewTaskDeadline(e.target.value)} className='form-control'/>
                </div>
            </div>
            <button className="btn btn-primary" onClick={submit}>追加</button>
        </>
    )
}

export default NewTaskForm;