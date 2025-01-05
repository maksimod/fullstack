export const App = () => {
  const ideas = [
    { nick: "cool-idea-nick-1", name: 'idea1', description: 'Description of idea 1' },
    { nick: "cool-idea-nick-2", name: 'idea2', description: 'Description of idea 2' },
    { nick: "cool-idea-nick-3", name: 'idea3', description: 'Description of idea 3' },
    { nick: "cool-idea-nick-4", name: 'idea4', description: 'Description of idea 4' },
    { nick: "cool-idea-nick-5", name: 'idea5', description: 'Description of idea 5' },
  ]
  return (
    <div>
      <h1>My Ideas</h1>
        {ideas.map((idea)=> {
          return (
            <div key={idea.nick}>
              <h2>{idea.name}</h2>
              <p>{idea.description}</p>
            </div>
          )
        })}
    </div>
  )
}