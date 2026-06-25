export default function UserCard({ user }) {
  return (
    <div data-testid={`user-${user.id}`}>
      <strong>{user.name}</strong>
      <span>{user.email}</span>
    </div>
  )
}
