const rootBody = document.querySelector(".rootbody"),
  btn = document.getElementById("butt");

btn.addEventListener("click", () => {
  rootBody.innerHTML = "";
  runGame();
});

function runGame() {
  // These values are constant during the game,
  // declare them here once and for all
  const consumptionPerKm = 2,
    minStep = 0,
    maxStep = 6,
    initialPetrol = 50,
    pumpsCount = 6,
    refillAmount = 30,
    startLocation = 0,
    endLocation = 100,
    index = 0,
    petrolPumpLocations = getRandomIntegers(
      pumpsCount,
      startLocation,
      endLocation
    ).sort();
  //console.log(petrolPumpLocations);

  // These represent the state at any given time
  let position = startLocation,
    petrol = initialPetrol;
  logStr("Game Started");
  logStr(`Petrol Pumps Generated at ${petrolPumpLocations}`);

  if (isAtPump()) {
    petrol += refillAmount; // If there's a pump at the start
  }

  logState();

  // While we've not reached our destination and still have petrol
  while (position < endLocation && petrol > 0) {
    // Calculate some metrics for this step
    const autonomy = petrol / consumptionPerKm,
      remainingDistance = endLocation - position,
      maxDistance = Math.min(autonomy, remainingDistance, maxStep),
      stepDistance = getRandomInteger(minStep, maxDistance),
      stepConsumption = stepDistance * consumptionPerKm;

    // Adjust the state accordingly
    position += stepDistance;
    petrol -= stepConsumption;

    if (isAtPump()) {
      petrol += refillAmount;
    }
    logState();
  }

  if (position === endLocation) {
    logStr("You've reached your destination!");
  } else {
    logStr("Game Over");
  }

  function isAtPump() {
    return petrolPumpLocations.includes(position);
  }

  function logState() {
    let str = `Move : ${position}km\tPetrol Remaining: ${petrol}L`;
    if (isAtPump()) {
      str += ` ${refillAmount}L`;
    }
    logStr(str);
  }
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIntegers(n, min, max) {
  const res = [];

  while (res.length !== n) {
    const value = getRandomInteger(min, max);
    if (!res.includes(value)) {
      res.push(value);
    }
  }

  return res;
}

function logStr(str) {
  rootBody.innerHTML += "\n" + str;
}
