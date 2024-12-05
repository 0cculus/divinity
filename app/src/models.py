from django.db import models
from django.utils.timezone import localtime
from django.utils import timezone

class cred(models.Model):
    playerMail = models.EmailField(max_length=255, unique=True, serialize=True, default='')
    password = models.CharField(max_length=50, serialize=True)

class playerData(models.Model):
    email = models.EmailField(unique=True, max_length=255, default='')
    name = models.CharField(max_length=40)
    gamesWon = models.IntegerField(default=0)
    gamesLost = models.IntegerField(default=0)
    numTournament = models.IntegerField(default=0)
    numTourneyWins = models.IntegerField(default=0)
    isRegistered = models.BooleanField(default=False)
    isLogged = models.BooleanField(default=False)

    def updatePostGame(self, pointsA = int, pointsB = int):
        if (pointsA > pointsB):
            self.gamesWon += 1
        elif (pointsA < pointsB):
            self.gamesLost += 1

    def updatePostTourney(self, won = bool):
        if (won == True):
            self.numTourneyWins += 1
        self.numTournament += 1

class history(models.Model):
    playerA = models.CharField(max_length=40, default='')
    pointsA = models.IntegerField(default=0)
    playerB = models.CharField(max_length=40, default='')
    pointsB = models.IntegerField(default=0)
    winner = models.BooleanField(default=False)
    gameDate = models.DateTimeField(default=timezone.localtime(timezone.now()))

#CREATE TABLE IF NOT EXISTS auth (
#		playerID INT DEFAULT 0,
#		pass VARCHAR(30) DEFAULT '');

# CREATE TABLE IF NOT EXISTS players (
#		playerID INT DEFAULT 0,
#		mail VARCHAR(60) DEFAULT '',
#		name VARCHAR(40) DEFAULT '',
#		gamesWon INT DEFAULT 0,
#		gamesLost INT DEFAULT 0,
#		numTournemant INT DEFAULT 0,
#		numTourneyWins INT DEFAULT 0,
#		isRegistered BOOLEAN DEFAULT FALSE,
#		isLogged BOOLEAN DEFAULT FALSE);

#CREATE TABLE IF NOT EXISTS history(
#		gameID INT DEFAULT 0,
#		playerA VARCHAR(40) DEFAULT '',
#		pointsA INT DEFAULT 0,
#		playerB VARCHAR(40) DEFAULT '',
#		pointsB INT DEFAULT 0,
#		winner BOOLEAN DEFAULT FALSE);