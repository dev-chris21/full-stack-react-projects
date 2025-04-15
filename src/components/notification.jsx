

const Notification = ({message, type}) => {
    if(!message) return null
    
    const styles = {
      padding: '10px',
      marginBottom: '1rem',
      border: `2px solid ${type ===
        'success' ? 'green' : 'red'}`,
      color: type === 'success' ? 'green' : 'red',
    }

    return (
      <div style={styles}>
        {message}
      </div>
    )
  }

  export default Notification