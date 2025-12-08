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
function simulateBall(batsman) {
  const outcomes = [0, 1, 2, 3, 4, 5, 6, "W"]


  // based on the probablity return the outcome
}
/**
 * Returns the match summary
 * @returns {object} matchSummary
 */
function simulateScore() {
  randomOutcome(probablities, outcomes)
  return matchSummary;

}

/**
 * Returns the  outcome for each ball
 * @param {number[]} probablities
 * @returns {string|number} outcome
 */
function simulateBall(batterName) {
  // looks up batter in probabilities chart
  // randomly determines outcome
  // return outcome as str | num
}


/**
 * Returns updatedGamestate
 * @param {object} gameState
 * @returns {object} updatedGamestate
 */
function simulateOver(gameState) {
  // while loop with the gamestate of balls
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
  // while until match end (target,over,wickets)
  // call simulateOver function
  // change batsman after each over
  // print the final match state


}

