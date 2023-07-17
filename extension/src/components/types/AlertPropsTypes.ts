
export type TAlertProps = {
    title?: string
    description: string
    alertType: "danger" | "warning" | "info" | "success" | "none"
    location: 'top' | 'bottom'
}
