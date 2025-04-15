const LoginForm = ({
    handleSubmit,
    password,
    username,
    handleUsernameChange,
    handlePasswordChange
   }) => {

   return (
     <div>
       <h2>Login to the application</h2>
        <form onSubmit={handleSubmit}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm