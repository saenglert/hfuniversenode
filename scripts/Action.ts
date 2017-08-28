
// Interface for messages sent between server and client
export interface Message {
    // Authentication token, required to access game or admin logic, acquired by login in
    auth: string;
    // Which part of the logic handles this request
    handler: string;
    // Data to be handled
    data: Data;
}

export interface Data {

}

export interface AuthData extends Data {
    // Username of the person login
    user: string;
    // Plaintext password of the person login in
    password: string;
    // What to do with the information above
    action: string
}