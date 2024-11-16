type TaskCompl = 'Completada' | 'Incompleta' 

export interface CreateTask {
    title: string;
    description: TaskCompl // usamos nuestro tipo
}