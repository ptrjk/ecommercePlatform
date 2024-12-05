
export function transformStatus(status) {
    if (status === 1) {
        return 'Pending';
    }
    if (status === 2) {
        return 'Delivered';
    }
    return '-';
}
