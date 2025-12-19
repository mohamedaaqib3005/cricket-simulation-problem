// //PSUEDOCODE

// 1.Create an array of outcomes.
// 2.Create an array of probablity of these outcomes.
// 3.Based on the probablity of outcomes give the different results of the ball
// 4.If the ball is dot then dont update the score of the batsman, dont  change the  strike of the batsman, reduce the ball by one and also dont change the score.
// 5.If there is a single / three / five runs scored then  update the score of the batsman by one / three / five, change the  strike of the batsman, reduce the ball by one  and also  increase the score by single / three / five.
// 6.If there is a two / four / six runs scored then  update the score of the batsman by two / four / six, dont  change the  strike of the batsman, reduce the ball by one   and also  increase the score by two / four / six.
// 7.If there is a wicket then change the batsman reduce the ball count and also reduce the wicket in score.
// 8.If the balls reduce by six change the bowler and change the strike of batsman.
// 9.Give running this random results for 24 balls or until there are 4 wicket are taken or 40 runs are scored whichever is first.
// 10.Return the result of the match.
module.exports = { simulateBall };

const OUTCOMES = [0, 1, 2, 3, 4, 5, 6, "W"];

const PLAYER_PROBABILITIES = {
  kirat: [0.05, 0.30, 0.25, 0.10, 0.15, 0.01, 0.09, 0.05],
  nodhi: [0.10, 0.40, 0.20, 0.05, 0.10, 0.01, 0.04, 0.10],
  rumrah: [0.20, 0.30, 0.15, 0.05, 0.05, 0.01, 0.04, 0.20],
  shashi: [0.30, 0.25, 0.05, 0.00, 0.05, 0.01, 0.04, 0.30]
};

function buildOutcomeRanges(probabilities, outcomes) {
  let cumulative = 0;
  const ranges = [];

  for (let i = 0; i < probabilities.length; i++) {
    const from = cumulative;
    cumulative = cumulative + probabilities[i];

    ranges.push({
      from,
      to: cumulative,
      outcome: outcomes[i]
    });
  }

  return ranges;
}

const PLAYER_OUTCOME_RANGES = {};

for (const batter in PLAYER_PROBABILITIES) {
  PLAYER_OUTCOME_RANGES[batter] =
    buildOutcomeRanges(PLAYER_PROBABILITIES[batter], OUTCOMES);
}
// dynamic for diff players


function createInitialGameState() {
  return {
    target: 40,
    overs: 4,
    wicketsLeft: 4,
    battingOrder: ["kirat", "nodhi", "rumrah", "shashi"],
    strikerIndex: 0,
    nonStrikerIndex: 1,
    nextBatsmanIndex: 2,
    players: {
      kirat: { runs: 0, balls: 0 },
      nodhi: { runs: 0, balls: 0 },
      rumrah: { runs: 0, balls: 0 },
      shashi: { runs: 0, balls: 0 }
    }
  };
}

function MatchGoingOn(gameState) {
  return (
    gameState.target > 0 &&
    gameState.overs > 0 &&
    gameState.wicketsLeft > 0
  );
}

function changeOver(gameState) {
  gameState.overs--;

  [gameState.strikerIndex, gameState.nonStrikerIndex] =
    [gameState.nonStrikerIndex, gameState.strikerIndex];
}

function formatResult(gameState) {

  let result;
  if (gameState.target <= 0) {
    result = `Bangalore won with ${gameState.wicketsLeft} wickets`;
  }
  else {
    result = `Chennai won `
  }
  return {
    result,
    players: gameState.players
  }
}
/**
 * Returns the  outcome for each ball
 * @param {number[]} probablities
 * @returns {string|number} outcome
 */
function simulateBall(batter) {
  // looks up batter in probabilities chart


  // randomly determines outcome
  const rand = Math.random()


  const ranges = PLAYER_OUTCOME_RANGES[batter]
  for (let i = 0; i < ranges.length; i++) {

    if (rand >= ranges[i].from && rand < ranges[i].to) {
      return ranges[i].outcome;
    }

  }

  // return outcome as str | num
}
function simulateOver(gameState) {
  // while loop with the gamestate of balls
  let currentBall = 0
  while (currentBall < 6) {
    const striker = gameState.battingOrder[gameState.strikerIndex];
    const outcome = simulateBall(striker);

    const { gameState: updatedGamestate, matchEnded } = updateGameState(gameState, striker, outcome);


    currentBall++;

    if (result.matchEnded) {
      break;

    }
    // call simulateBall with strike batsman
    // based on the outcome update gameState
    // break if the target is acheived or the wickets are over
    // return updatedGamestate
  }
  return gameState;
}

/**
 * Returns updatedGamestate
 * @param {object} gameState
 * @returns {object} updatedGamestate
 */
function updateGameState(gameState, striker, outcome) {
  let matchEnded = false;
  gameState.players[striker].balls++;

  if (outcome === "W") {

    gameState.wicketsLeft--;

    if (gameState.wicketsLeft <= 0) {
      matchEnded = true;
      return { gameState, matchEnded };
    }

    if (gameState.nextBatsmanIndex < gameState.battingOrder.length) {
      gameState.strikerIndex = gameState.nextBatsmanIndex;
      gameState.nextBatsmanIndex++;
    } else {
      matchEnded = true;
    }

  } else {
    const runs = outcome;

    gameState.players[striker].runs += runs;
    gameState.target -= runs;

    if (runs % 2 === 1) {
      [gameState.strikerIndex, gameState.nonStrikerIndex] =
        [gameState.nonStrikerIndex, gameState.strikerIndex];
    }

    if (gameState.target <= 0) {
      matchEnded = true;
    }
  }
  return { gameState, matchEnded };
}


/**
 * Returns the  match summary
 *
 * @returns {string|number} matchSummary
 */
function simulateMatch() {
  //create the initial gamestate
  const gameState = createInitialGameState()

  while (MatchGoingOn(gameState)) {
    gameState = simulateOver(gameState);
    if (!MatchGoingOn(gameState)) break;

    changeOver(gameState);

  }
  return formatResult(gameState);
  // while until match end (target,over,wickets)
  // call simulateOver function
  // change batsman after each over
  // print the final match state


}
// replace the random generator with seeded random generator/mocking
// make sure it is working by writing a testcase
// create a compute prefix sum(cdf) funcfor each player rather than calculate  cumulative for each ball
// updateGameState shouldnt mutate gamestate
// Deep copy vs Shallow copy
// Dont track wicketsleft
// dont update target
// dont track overs in gamestate
// change over to change strike
// jest
