import TasksList from "../Tasks/List"

export default function Tasks({children}) {
    return (
        <div className="tasks">
            <h1 className="back-office__title"><span>Tâches</span></h1>
            <TasksList />
            {children}
        </div>
    )
}