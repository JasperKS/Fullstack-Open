const PersonForm = ({addName, newName, setNewName, newNumber, handleNewNumber}) =>{
    return (
        <>
            <form onSubmit={addName}>
                <div>
                    name:
                    <input value={newName} onChange={({ target }) => setNewName(target.value)} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm
    