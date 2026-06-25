export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <input
        placeholder="Search users"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
