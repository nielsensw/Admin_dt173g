<?php
include('config/config.php');
 // Inloggning
 if (isset($_POST['username'])) {
    // Tar inputs från formuläret
    $user = $_POST['username'];
    $password = $_POST['password'];

    $login = new Login();
     // Kör klassens metod för att kolla inlogg-uppgifter
    $login->loginUser($user, $password);
        
};
?>
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index | Projekt DT173G Sally Nielsen</title>
    <!-- Bootstrap for styling -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" crossorigin="anonymous">
</head>

<body>
    <header></header>
    <main id="main-index">
        <div class="form">
            <!-- Formulär Inloggning -->
            <form id="form-login" class="portform form" method="post">
                <h3>Logga in</h3>
                <div class="form-group form-div">
                    <label for="username">Användarnamn</label>
                    <input class="form-control" type="text" id="username" name="username" placeholder="Användarnamn">
                </div>
                <div class="form-group form-div">
                    <label for="password">Lösenord</label>
                    <input class="form-control" type="password" id="password" name="password" placeholder="Lösenord">
                </div>
                <input type="submit" id="login-btn" class="btn btn-success" value="Logga in">

            </form>
    </div>
    </main>
    <footer></footer>
</body>
</html>