
// General helper functions used throughout the project

// Returns a random number between max and min
export function random(_min: number, _max: number): number {
    return Math.random() * (_max - _min) + _min;
}
