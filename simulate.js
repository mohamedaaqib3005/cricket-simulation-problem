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
  simulateMatch,
  createInitialGameState
};

function deepCopyGameState(gameState) {
  return {
    ...gameState,
    players: Object.fromEntries(
      Object.entries(gameState.players).map(([name, stats]) => [
        name,
        { ...stats }
      ])
    )
  };
}

function getTotalBalls(gameState) {

  return Object.values(gameState.players)
    .reduce((total, player) => total + player.balls, 0)

}

function getTotalRuns(gameState) {
  return Object.values(gameState.players)
    .reduce((total, player) => total + player.runs, 0);
}

function getNextBatsmanIndex(gameState) {
  return Math.max(
    gameState.strikerIndex,
    gameState.nonStrikerIndex
  ) + 1;
}

function getRemainingWickets(gameState) {
  return (
    gameState.battingOrder.length - getNextBatsmanIndex(gameState)
  );
}

function swapStrikers(gameState) {

  return {
    ...gameState,
    strikerIndex: gameState.nonStrikerIndex,
    nonStrikerIndex: gameState.strikerIndex,
  };
}

function playDelivery(gameState, ballFn = simulateBall) {
  const striker = gameState.battingOrder[gameState.strikerIndex];
  const outcome = ballFn(striker);

  return updateGameState(gameState, striker, outcome);

}

function isEndOfOver(gameState) {
  const balls = getTotalBalls(gameState);
  return balls > 0 && balls % 6 === 0;
}
const BALL_OUTCOMES = [0, 1, 2, 3, 4, 5, 6, "W"];

const PLAYER_OUTCOME_PROBABILITIES = {
  kirat: [0.05, 0.30, 0.25, 0.10, 0.15, 0.01, 0.09, 0.05],
  nodhi: [0.10, 0.40, 0.20, 0.05, 0.10, 0.01, 0.04, 0.10],
  rumrah: [0.20, 0.30, 0.15, 0.05, 0.05, 0.01, 0.04, 0.20],
  shashi: [0.30, 0.25, 0.05, 0.00, 0.05, 0.01, 0.04, 0.30]
};

const TARGET_RUNS = 40;

function buildOutcomeRanges(probabilities, outcomes) {
  let cumulative = 0;

  const ranges = probabilities.map((probablity, i) => {
    const from = cumulative;
    cumulative = cumulative + probablity
    return {
      from,
      to: cumulative,
      outcome: outcomes[i]
    }
  })


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
    battingOrder: ["kirat", "nodhi", "rumrah", "shashi"],
    strikerIndex: 0,
    nonStrikerIndex: 1,
    nextBatsmanIndex: 2,// single source of truth can use max index of current batsman playing
    players: {
      kirat: { runs: 0, balls: 0 },
      nodhi: { runs: 0, balls: 0 },
      rumrah: { runs: 0, balls: 0 },
      shashi: { runs: 0, balls: 0 }
    }
  };
}

function isMatchGoingOn(gameState) {
  return (
    getTotalRuns(gameState) < TARGET_RUNS &&
    getTotalBalls(gameState) < 24 &&
    getRemainingWickets(gameState) > 0);
}



function formatResult(gameState) {
  const wicketsRemaining = getRemainingWickets(gameState);
  const totalRuns = getTotalRuns(gameState);


  let result;
  if (totalRuns >= TARGET_RUNS) {
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

// format the player details also
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

/**
 * Returns updatedGamestate
 * @param {object} gameState
 * @returns {object} updatedGamestate
 */
function updateGameState(gameState, striker, outcome) {
  const state = deepCopyGameState(gameState);

  // every delivery consumes a ball
  state.players[striker].balls += 1;

  // WICKET
  if (outcome === "W") {
    const nextBatsmanIndex = getNextBatsmanIndex(state);

    if (nextBatsmanIndex >= state.battingOrder.length) {
      return { gameState: state, matchEnded: true };
    }
    state.strikerIndex = nextBatsmanIndex;

    return { gameState: state, matchEnded: false };
  }

  // RUNS
  const runs = outcome;
  state.players[striker].runs += runs;

  if (runs % 2 === 1) {
    const temp = state.strikerIndex;
    state.strikerIndex = state.nonStrikerIndex;
    state.nonStrikerIndex = temp;
  }

  return {
    gameState: state,
    matchEnded: getTotalRuns(state) >= TARGET_RUNS
  };

}

//create afn called getTotalRuns instead of mutating target




/**
 * Returns the  match summary
 *
 * @returns {string|number} matchSummary
 */
function simulateMatch(ballFn = simulateBall) {
  //create the initial gamestate
  let gameState = createInitialGameState()

  while (isMatchGoingOn(gameState)) {
    const result = playDelivery(gameState, ballFn);
    gameState = result.gameState;
    if (result.matchEnded) break;

    if (isEndOfOver(gameState)) {
      gameState = swapStrikers(gameState);
    }
  }

  return formatResult(gameState);


}
console.log(simulateMatch())
// while until match end (target,over,wickets)
// call simulateOver function
// change batsman after each over
// print the final match state



