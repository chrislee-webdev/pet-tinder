import React from 'react';
import coverImage from  '../../assets/cover-image.jpeg';


function About() {

    return (
        <section>
            <form class="login-form">
                <div>
                    <label for="email-login">Email:</label>
                    <input type="text" id="email-login" />
                </div>
                <div>
                    <label for="password-login">Password:</label>
                    <input type="password" id="password-login" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>

            <form class="signup-form">
                <div>
                    <label for="username-signup">Username:</label>
                    <input type="text" id="username-signup" />
                </div>
                <div>
                    <label for="email-signup">Email:</label>
                    <input type="text" id="email-signup" />
                </div>
                <div>
                    <label for="password-signup">Password:</label>
                    <input type="password" id="password-signup" />
                </div>
                <div>
                    <button type="submit">Signup</button>
                </div>
            </form>
        
        
            <img src={coverImage} style={{ width: '50%' }} alt='cover' />

            {/* title and decription of pet tinder */}
            <p>
                Pinder: Puppy Love!
            </p>
        </section>  
    )
}

export default About;
