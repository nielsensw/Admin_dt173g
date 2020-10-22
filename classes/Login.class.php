<?php

// Kod av Sally Nielsen
// Login
class Login
{

protected $username ='redacted';
protected $password = 'redacted';

    public function loginUser($user, $pass){
        // Om det finns en matchning så startar inloggningssessionen 
        if ($user == $this->username && $pass == $this->password) {
            $_SESSION['username'] = $user;
           header("Location: admin.php");
        } else {
           
           echo "<h4>Felaktig Användarnamn/Lösenord</h4>";
        }
    }
}

 ?>
