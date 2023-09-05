export default function Badge({children, role}) {
    return (
        <div className={`badge ${role === 'admin' ? 'badge--admin' : ''}`}>
            <span>{children}</span>
        </div>
    )
}