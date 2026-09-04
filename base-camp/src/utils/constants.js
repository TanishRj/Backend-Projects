// Creating and exporting User roles 
export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

// Exporting roles available as array so that it can be looped through 
export const AvailableUserRole = Object.values(UserRolesEnum)