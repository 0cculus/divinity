export class Player
{
	name
	score = 0
	constructor (name)
	{
		this.name = name
	}

	getScore()
	{
		return this.score
	}

	setScore(newScore)
	{
		this.score = newScore
	}
}


