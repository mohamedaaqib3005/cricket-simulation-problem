# cricket-simulation-problem
Problem Context
- It's the finals of the T20 Cup! Bengaluru and Chennai, neighbours and fierce rivals, are
fighting it out for the title. Bengaluru's star batsman Kirat is at the crease. Can he win it for
Bengaluru? Write code to simulate the last 4 overs of the match.
It's the last 4 overs of the match. Bengaluru needs 40 runs to win and with 4 wickets left. Each
player has a different probability for scoring runs. Your coding problem is to simulate the match,
ball by ball. The match simulation will require you to use a weighted random number generation
based on probability to determine the runs scored per ball.

**PLAYER PROBABILITY**
- The data below used in cricket analytics, showing the likelihood of specific outcomes for each batsman. The data lists the probabilities (in percentages) for scoring 0 (Dot Ball), 1, 2, 3, 4, 5, 6 runs, or getting Out on the next ball.

### Player Probabilities
- **Kirit Boli**: Highest chance of a dot ball (30%), moderate chance of scoring 2 runs (25%), and a 5% chance of getting out.
- **N.S Nodhi**: 40% chance of a dot ball, 20% for 2 runs, and 10% chance of dismissal.
- **R Rumrah**: 30% chance of a dot ball, 20% for 1 run, and a 20% chance of being out.
- **Shashi Henra**: Highest risk with a 30% chance of a dot ball and a **30% probability of getting out**, the highest among all players.


Rules of the game:
-  Batsmen change strike end of every over. They also change strike when they score a
1,3 or 5
-  When a player gets out, the new player comes in at the same position.
- Assume only legal balls are bowled (no wides, no no-balls etc..). Therefore an over is
always 6 balls.

Sample Output
- Bengaluru won by 1 wicket and 2 balls remaining
- Kirat Boli - 12 (6 balls)
- NS Nodhi - 25 (11 balls)
- R Rumrah - 2* (3 balls)
- Shashi Henra - 2* (2 balls)

Sample commentary
- 4 overs left. 40 runs to win
- 0.1 Kirat Boli scores 1 run
- 0.2 NS Nodhi scores 4 runs
- 0.3 NS Nodhi scores 1 run
- 0.4 Kirat Boli scores 2 runs
- 0.5 Kirat Boli scores 3 runs
- 0.6 NS Nodhi scores 1 run
- 3 overs left. 28 runs to win
- 1.1 NS Nodhi scores 2 runs
…
- ....1

Guidelines
- Use your favorite language & editor
- Clean, OO (or functional if you prefer) code is expected. Preferably with tests.
