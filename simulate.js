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
module.exports = {
  simulateBall,
  simulateOver,
  simulateMatch,
  createInitialGameState
};

const BALL_OUTCOMES = [0, 1, 2, 3, 4, 5, 6, "W"];

const PLAYER_OUTCOME_PROBABILITIES = {
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
// Change the object to array of cumulative distribution
//

const PLAYER_OUTCOME_RANGES = {};

for (const batter in PLAYER_OUTCOME_PROBABILITIES) {
  PLAYER_OUTCOME_RANGES[batter] =
    buildOutcomeRanges(PLAYER_OUTCOME_PROBABILITIES[batter], BALL_OUTCOMES);
}
// dynamic for diff players
// console.log(PLAYER_OUTCOME_RANGES[batter])

function createInitialGameState() {
  return {
    target: 40,
    overs: 4,
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
    gameState.nextBatsmanIndex < gameState.battingOrder.length
  );
}

function changeOver(gameState) {
  return {
    ...gameState,
    strikerIndex: gameState.nonStrikerIndex,
    nonStrikerIndex: gameState.strikerIndex
  };
}

function formatResult(gameState) {
  const wicketsLost = gameState.nextBatsmanIndex - 1;
  const wicketsRemaining =
    gameState.battingOrder.length - gameState.nextBatsmanIndex;
  let result;
  if (gameState.target <= 0) {
    result = `Bangalore won with ${wicketsRemaining} wickets`;
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
  // findIndex
}
function simulateOver(gameState, ballFn = simulateBall) {
  // while loop with the gamestate of balls
  let currentBall = 0
  let state = gameState
  while (currentBall < 6) {
    const striker = state.battingOrder[state.strikerIndex];
    const outcome = ballFn(striker);
    const result = updateGameState(state, striker, outcome);
    state = result.gameState;
    currentBall++;

    if (result.matchEnded) {
      break;
    }

    // call simulateBall with strike batsman
    // based on the outcome update gameState
    // break if the target is acheived or the wickets are over
    // return updatedGamestate
  }
  return state;
}

/**
 * Returns updatedGamestate
 * @param {object} gameState
 * @returns {object} updatedGamestate
 */function updateGameState(gameState, striker, outcome) {
  const baseState = {
    ...gameState,
    players: {
      ...gameState.players,
      [striker]: {
        ...gameState.players[striker],
        balls: gameState.players[striker].balls + 1
      }
    }
  };


  if (outcome === "W") {
    // innings over
    if (gameState.nextBatsmanIndex >= gameState.battingOrder.length) {
      return { gameState: baseState, matchEnded: true };
    }

    // next batsman
    return {
      gameState: {
        ...baseState,
        strikerIndex: gameState.nextBatsmanIndex,
        nextBatsmanIndex: gameState.nextBatsmanIndex + 1
      },
      matchEnded: false
    };
  }

  // Runs
  const runs = outcome;
  const target = gameState.target - runs;
  const isOdd = runs % 2 === 1;

  const newGameState = {
    ...baseState,
    target,
    strikerIndex: isOdd ? gameState.nonStrikerIndex : gameState.strikerIndex,
    nonStrikerIndex: isOdd ? gameState.strikerIndex : gameState.nonStrikerIndex,
    players: {
      ...baseState.players,
      [striker]: {
        ...baseState.players[striker],
        runs: baseState.players[striker].runs + runs
      }
    }
  };

  return {
    gameState: newGameState,
    matchEnded: target <= 0
  };
}





/**
 * Returns the  match summary
 *
 * @returns {string|number} matchSummary
 */
function simulateMatch(ballFn = simulateBall) {
  //create the initial gamestate
  let gameState = createInitialGameState()

  while (MatchGoingOn(gameState)) {
    gameState = simulateOver(gameState, ballFn);
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
// create a compute prefix sum(cdf) func for each player rather than calculate  cumulative for each ball
// updateGameState shouldnt mutate gamestate
// Deep copy vs Shallow copy
// Dont track wicketsleft just use the batting order instead of having a new var wickets;
// dont update target just check with the runs of batsman
// dont track overs in gamestate just use the no of balls played by batsman
// rename change over to change strike
