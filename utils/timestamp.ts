export function generateTimestamp(): string {
    const now = new Date();
    const timestamp = now.getTime();
    return timestamp.toString();
}