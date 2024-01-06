export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    confirmDelete?: boolean; 
    intentionDelete?: boolean; 
}
