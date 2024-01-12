import { useState } from "react"
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const {storeTokenInLS} = useAuth();

  const navigate = useNavigate();
  const URL = "http://localhost:5000/api/auth/login";
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value,
    })
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
      });
      if(response.ok){
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        setUser({email:"",password:""});
      }
      alert("Login Successful");
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log("login",error);
    }
  };

  return (
    <>
    <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="image"
                  width="500"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" >email</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="email" 
                      id="email" 
                      required 
                      autoComplete="off" 
                      value={user.email}
                      onChange={handleInput}  
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" >password</label>
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="password" 
                      id="password" 
                      required 
                      autoComplete="off" 
                      value={user.password}
                      onChange={handleInput}  
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-sumbit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
