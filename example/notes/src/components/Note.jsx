const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'
  return (
    <li>
      {note.content}
      <button onClick={toggleImportant}>{label}</button>
    </li>
  )
}

export default Note