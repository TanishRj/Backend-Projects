// Creating and exporting User roles object
export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

// Exporting roles available as array so that it can be looped through 
export const AvailableUserRole = Object.values(UserRolesEnum)

// Creating and exporting Task status object
export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}

// Exporting task status available as array so that it can be looped through 
export const AvailableTaskStatus = Object.values(TaskStatusEnum)
