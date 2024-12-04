/*SELECT '*/CREATE DATABASE transcend/*'*/ 
/*WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname= 'transcend')*/;

\connect transcend;

CREATE TABLE IF NOT EXISTS auth (
		playerMail VARCHAR(255) DEFAULT 0,
		pass VARCHAR(30) DEFAULT '');
CREATE TABLE IF NOT EXISTS players (
		playerID INT DEFAULT 0,
		mail VARCHAR(60) DEFAULT '',
		name VARCHAR(40) DEFAULT '',
		gamesWon INT DEFAULT 0,
		gamesLost INT DEFAULT 0,
		numTournemant INT DEFAULT 0,
		numTourneyWins INT DEFAULT 0,
		isRegistered BOOLEAN DEFAULT FALSE,
		isLogged BOOLEAN DEFAULT FALSE);

CREATE TABLE IF NOT EXISTS history(
		playerA VARCHAR(40) DEFAULT '',
		pointsA INT DEFAULT 0,
		playerB VARCHAR(40) DEFAULT '',
		pointsB INT DEFAULT 0,
		winner BOOLEAN DEFAULT FALSE,
		gameDate TIMESTAMP);
