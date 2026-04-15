function Task({task, service, onChanged}) {
    const formatDate = (time) => {
        return time && time !== "0" && time !== 0
                ? new Date(Number(time)).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })
                : "期限なし";
    }

    const controlTask = async (mode) => {
        await service.controlTask(task.id, mode);
        onChanged();
    }

    return (
        <div>
            <span className="task-title">{task.content}</span>
            <div className="task-actions">
                <button onClick={() => controlTask("done")} className='btn btn-sm btn-success'>完了</button>
                <button onClick={() => controlTask("delete")} className='btn btn-sm btn-danger'>削除</button>
            </div>
            <div className="text-muted small mt-1">
                期限: {formatDate(task.deadline)}
            </div>
            <div className="text-muted small">{task.done == true ? (<span style={{ color: "#00a300"}}>✅ 完了済み</span>) : (<span style={{ color: "#ff5456"}}>🕒 未完了</span>)}</div>
            <hr />
        </div>
    )
}

export default Task;