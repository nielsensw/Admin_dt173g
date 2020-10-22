<?php
include('config/config.php');

//Kontrollerar inlogg
if (!isset($_SESSION['username'])) {
    header('Location: index');
}
?>
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin | Projekt DT173G Sally Nielsen</title>
    <!-- Bootstrap for styling  + CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" crossorigin="anonymous">
</head>

<body>
    <header>
        <div class="alert alert-primary" role="alert">
            Du är nu inloggad som administratör -
            <a class="btn btn-secondary" href="logout.php">Logga ut</a></div>

    </header>
    <main>
        <div class="lists">
            <!-- Listor skrivs ut från db -->
            <div class="portfolio table-responsive">
                <!-- Tabell för portfolio -->
                <h2>Portfolio</h2>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Url</th>
                            <th scope="col">Beskrivning</th>
                            <th scope="col">bild</th>
                            <th scope="col">uppdatera</th>
                            <th scope="col">radera</th>
                        </tr>
                    </thead>
                    <tbody id="table-port">
                        <!-- Portfolio skrivs ut här -->

                    </tbody>


                </table>
            </div>
            <div class="experience table-responsive">
                <!-- Tabell för erfarnehet -->
                <h2>Arbetserfarenhet</h2>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Arbetsplats</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Årtal</th>
                            <th scope="col">uppdatera</th>
                            <th scope="col">radera</th>
                        </tr>
                    </thead>
                    <tbody id="table-exp">
                        <!-- Erfarenhet skrivs ut här -->
                    </tbody>

                </table>
            </div>
            <div class="school table-responsive">
                <!-- Tabell för Utbildning -->
                <h2>Utbildning</h2>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Institut</th>
                            <th scope="col">Utb.namn</th>
                            <th scope="col">Årtal</th>
                            <th scope="col">uppdatera</th>
                            <th scope="col">radera</th>
                        </tr>
                    </thead>
                    <tbody id="table-scho">

                    </tbody>
                </table>
            </div>
            <div class="skills table-responsive">
                <!-- Tabell för Utbildning -->
                <h2>Kodspråk</h2>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Språk</th>
                            <th scope="col">Beskrivning</th>
                            <th scope="col">uppdatera</th>
                            <th scope="col">radera</th>
                        </tr>
                    </thead>
                    <tbody id="table-skills">

                    </tbody>
                </table>
            </div>
        </div>
        <!-- Formulär sektion -->
        <div class="forms">
            <!-- Formulär portfolio -->
            <form id="form-port" class="portform form">
                <h3>Portfolio</h3>
                <div id="id-spot"></div>
                <div class="form-group form-div">
                    <label for="title-port">Titel</label>
                    <input class="form-control" type="text" id="title-port" name="title" placeholder="Titel">
                </div>

                <div class="form-group form-div">
                    <label for="url-port">Url</label>
                    <input class="form-control" type="text" id="url-port" name="url" placeholder="Url">
                </div>

                <div class="form-group form-div">
                    <label for="desc-port">Beskrivning</label>
                    <input class="form-control" type="text" id="desc-port" name="description" placeholder="Beskrivning">
                </div>

                <div class="form-group form-div">
                    <label for="image-port">Bild</label>
                    <input class="form-control" type="text" id="image-port" name="image" placeholder="bild">
                </div>

                <input type="submit" id="sub-btn-port" class="btn btn-success" value="Lägg till">
                <button class="btn btn-warning" onClick="refresh()">Ångra</button>
            </form>

            <!-- Formulär erfarenhet -->
            <form id="form-exp" class="expform form">
                    <h3>Erfarenhet</h3>
                    <div id="id-spot-exp">
        </div>
        <div class="form-group form-div">
            <label for="workplace">Arbetsplats</label>
            <input class="form-control" type="text" id="workplace" name="workplace" placeholder="Arbetsplats">
        </div>
        <div class="form-group form-div">
            <label for="title-exp">Titel</label>
            <input class="form-control" type="text" id="title-exp" name="titleexp" placeholder="Titel">
        </div>

        <div class="form-group form-div">
            <label for="years-exp">Årtal</label>
            <input class="form-control" type="text" id="years-exp" name="yearsexp" placeholder="Årtal">
        </div>

        <input type="submit" id="sub-btn-exp" class="btn btn-success" value="Lägg till">
        <button class="btn btn-warning" onClick="refresh()">Ångra</button>
        </form>
        <!-- Formulär skola -->
        <form id="form-scho" class="schoform form">
                    <h3>Utbildning</h3>
                    <div id="id-spot-scho">
            </div>
            <div class="form-group form-div">
                <label for="school">Institut</label>
                <input class="form-control" type="text" id="school" name="school" placeholder="Institut">
            </div>
            <div class="form-group form-div">
                <label for="name-scho">Namn</label>
                <input class="form-control" type="text" id="name-scho" name="namescho" placeholder="Namn">
            </div>

            <div class="form-group form-div">
                <label for="years-scho">Årtal</label>
                <input class="form-control" type="text" id="years-scho" name="yearsscho" placeholder="Årtal">
            </div>

            <input type="submit" id="sub-btn-scho" class="btn btn-success" value="Lägg till">
            <button class="btn btn-warning" onClick="refresh()">Ångra</button>

        </form>
        <!-- Formulär Skills -->
        <form id="form-skill" class="skillform form">
                    <h3>Kodspråk</h3>
            <div id="id-spot-skill">

            </div>
            <div class="form-group form-div">
                <label for="lang">Språk</label>
                <input class="form-control" type="text" id="lang" name="lang" placeholder="Språk">
            </div>
            <div class="form-group form-div">
                <label for="desc-skill">Beskrivning</label>
                <input class="form-control" type="text" id="desc-skill" name="desc-skill" placeholder="Beskrivning">
            </div>
            <input type="submit" id="sub-btn-skill" class="btn btn-success" value="Lägg till">
            <button class="btn btn-warning" onClick="refresh()">Ångra</button>

        </form>


        </div>

    </main>
    <footer></footer>
    <script src="js/school.js"></script>
    <script src="js/portfolio.js"></script>
    <script src="js/experience.js"></script>
    <script src="js/skills.js"></script>
</body>
</html>