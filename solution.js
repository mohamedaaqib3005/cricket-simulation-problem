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


/**
 * Returns the  outcome for each ball
 * @param {number[]} probablities
 * @returns {string|number} outcome
 */
function simulateBall(batterName) {
  // looks up batter in probabilities chart
  const outcomes = [0, 1, 2, 3, 4, 5, 6, "W"];
  const probablity = {
    kirat: [0.05, 0.30, 0.25, 0.10, 0.15, 0.01, 0.09, 0.05],
    nodhi: [0.10, 0.40, 0.20, 0.05, 0.10, 0.01, 0.04, 0.10],
    rumrah: [0.20, 0.30, 0.15, 0.05, 0.05, 0.01, 0.04, 0.20],
    shashi: [0.30, 0.25, 0.05, 0.00, 0.05, 0.01, 0.04, 0.30]
  }
  const probablities = probablity[batterName] //dynamic key

  // randomly determines outcome
  const r = Math.random()
  let cumulative = 0;
  for (let i = 0; i < probablities.length; i++) {

    cumulative += probablities[i];
    if (r <= cumulative) {
      return outcomes[i];
    }

  }

  // return outcome as str | num
}


/**
 * Returns updatedGamestate
 * @param {object} gameState
 * @returns {object} updatedGamestate
 */


function simulateOver(gameState) {
  // while loop with the gamestate of balls
  let ballInOver = 0
  while (ballInOver < 6) {
    const striker = gameState.battingOrder[gameState.strikerIndex];
    const outcome = simulateBall(striker);

    if (outcome === "W") {
      gameState.wicketsLeft--;
      ballInOver++;

      if (gameState.wicketsLeft <= 0) {
        break;
      }
      if (gameState.nextBatsmanIndex < gameState.battingOrder.length) {
        gameState.strikerIndex = gameState.nextBatsmanIndex;
        gameState.nextBatsmanIndex++;
      } else {
        break;
      }
    }

    else {
      const runs = outcome;
      ballInOver++;
      gameState.players[striker].runs += runs;
      gameState.players[striker].balls += 1;
      gameState.target -= runs;

      if (runs % 2 === 1) {
        [gameState.strikerIndex, gameState.nonStrikerIndex] =
          [gameState.nonStrikerIndex, gameState.strikerIndex];
      }

      if (gameState.target <= 0) {
        break;
      }

    }

  }

  return gameState;

  // call simulateBall with strike batsman
  // based on the outcome update gameState
  // break if the target is acheived or the wickets are over
  // return updatedGamestate

}


/**
 * Returns the  match summary
 *
 * @returns {string|number} matchSummary
 */
function simulateMatch() {
  //create the initial gamestate
  const gameState = {
    target: 40,
    overs: 4,
    wicketsLeft: 4,
    battingOrder: ["kirat", "nodhi", "rumrah", "shashi"],
    ballInOver: 0,
    strikerIndex: 0,
    nonStrikerIndex: 1,
    nextBatsmanIndex: 2,
    players: {
      kirat: { runs: 0, balls: 0 },
      nodhi: { runs: 0, balls: 0 },
      rumrah: { runs: 0, balls: 0 },
      shashi: { runs: 0, balls: 0 }
    },
  }


  while (
    gameState.target > 0 &&
    gameState.overs > 0 &&
    gameState.wicketsLeft > 0
  ) {
    simulateOver(gameState);
    gameState.overs--;
    [gameState.strikerIndex, gameState.nonStrikerIndex] =
      [gameState.nonStrikerIndex, gameState.strikerIndex];

  }
  let result;
  if (gameState.target <= 0) {
    result = `Bangalore won with ${gameState.wicketsLeft} wickets`;
  }
  else {
    result = `Chennai won with ${gameState.runs} runs`
  }

  const resultObject = {};
  resultObject.result = result;
  resultObject.players = gameState.players;

  return resultObject;
  // while until match end (target,over,wickets)
  // call simulateOver function
  // change batsman after each over
  // print the final match state


}

