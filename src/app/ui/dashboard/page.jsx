export default function Page() {
  const squareStyle = {
    width: '100%',
    height: '700px',
    backgroundColor: 'transparent',
    border: '2px solid #1d3863',    
    color: '#1d3863',              
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: '4px'
  };

  return (
    <div>
      <p>Dashboard</p>
      <div style={squareStyle}>
        Welcome User
      </div>
    </div>
  );
}