export type NotificationErrorProps = {
    message: string
    context: string
}

export class Notification {
    private error: NotificationErrorProps[]
    constructor() {
        this.error = [];
    }
    addError(message: NotificationErrorProps) {
        this.error.push(message)
    }

    messages(context?: string) {
        const output = [];
        this.error.map(notification => {
            if (context === notification.context || context === undefined) {
                output.push(`${notification.context}: ${notification.message}`)
            }
        })

        return output.join(', ')
    }


}