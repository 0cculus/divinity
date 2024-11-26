from django.db import models

class cred(models.Model):
    playerID = models.IntegerField()
    password = models.CharField(max_length=50)

class playerData(models.Model):
    playerID = models.IntegerField()
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=40)
    gamesWon = models.IntegerField(default=0)
    gamesLost = models.IntegerField(default=0)
    numTournament = models.IntegerField(default=0)
    numTourneyWins = models.IntegerField(default=0)
    isRegistered = models.BooleanField(default=False)
    isLogged = models.BooleanField(default=False)


class history(models.Model):
    playerA = models.CharField(max_length=40, default='')
    pointsA = models.IntegerField(default=0)
    playerB = models.CharField(max_length=40, default='')
    pointsB = models.IntegerField(default=0)
    winner = models.BooleanField(default=False)

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