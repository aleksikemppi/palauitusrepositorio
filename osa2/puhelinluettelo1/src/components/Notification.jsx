const Notification = ({message, className}) => {
    if (!message) {
        return null
    }
    return (
        <div className={`notification ${className}`}>{message}</div>
    )
}

export default Notification;