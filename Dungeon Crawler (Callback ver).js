const fantasyNames = [
  "Cloud",
  "Sephiroth",
  "Tifa",
  "Aerith",
  "Zidane",
  "Garnet",
  "Vivi",
  "Freya",
  "Noctis",
  "Lunafreya",
  "Ardyn",
  "Ignis",
  "Gladiolus",
  "Prompto",
  "Celes",
  "Terra",
  "Locke",
  "Kefka",
  "Balthier",
  "Fran",
  "Ashe",
  "Basch",
  "Vayne",
  "Ramza",
  "Delita",
  "Ultimecia",
  "Edea",
  "Rinoa",
  "Squall",
  "Cid",
  "Drizzt",
  "Bruenor",
  "Wulfgar",
  "Jarlaxle",
  "Elminster",
  "Vecna",
  "Mordenkainen",
  "Tasha",
  "Acererak",
  "Strahd",
  "Vlaakith",
  "Karsus",
  "Fizban",
  "Tiamat",
  "Bahamut",
  "Raistlin",
  "Dalamar",
  "Tasselhoff",
  "Kitiara",
  "Eldrin",
  "Faelar",
  "Gwyndolin",
  "Isolde",
  "Thalindra",
  "Kaelith",
  "Seraphine",
  "Aelric",
  "Sylvaris",
  "Vaelith",
  "Zephyrion",
  "Aeris",
  "Nyx",
  "Veylan",
  "Caladrel",
  "Eowyn",
  "Maelis",
  "Rhydian",
  "Zarek",
  "Orin",
  "Lyanna",
  "Vaelin",
  "Ysolde",
  "Thalion",
  "Elarion",
  "Fenrir",
  "Altharion",
  "Celestia",
  "Solara",
  "Draven",
  "Kaelar",
  "Riven",
  "Velaris",
  "Sylphira",
  "Arannis",
  "Malrik",
  "Zaelith",
  "Thalor",
  "Vaedrin",
  "Ephyria",
  "Zypheros",
  "Orion",
  "Lorien",
  "Mirelle",
  "Veldrin",
  "Lirien",
  "Aurius",
  "Xanaphia",
  "Talanis",
  "Elowen",
  "Darian",
  "Galen",
  "Rowan",
  "Isilme",
  "Mystral",
  "Vespera",
  "Zephyria",
  "Tyrael",
  "Dusk",
  "Nimue",
];
const Party = [
  { Role: "Archer", STR: 2, DEX: 6, INT: 2 },
  { Role: "Warrior", STR: 7, DEX: 2, INT: 1 },
  { Role: "Knight", STR: 5, DEX: 2, INT: 3 },
  { Role: "Wizard", STR: 1, DEX: 1, INT: 8 },
  { Role: "Cleric", STR: 2, DEX: 1, INT: 7 },
  { Role: "Bard", STR: 2, DEX: 5, INT: 3 },
  { Role: "Thief", STR: 1, DEX: 7, INT: 2 },
  { Role: "Monk", STR: 4, DEX: 2, INT: 4 },
];
const Dungeons = [
  { dungeon: "Cave", Boss: "Titan, Lord of Crags", Difficulty: 48 },
  { dungeon: "Temple", Boss: "Iona, Shield of Emeria", Difficulty: 60 },
  { dungeon: "Swamp", Boss: "Cúchulainn, the Impure", Difficulty: 52 },
  { dungeon: "Island", Boss: "Leviathan, Lord of the Whorl", Difficulty: 58 },
  { dungeon: "Forest", Boss: "Kogla, the Titan Ape", Difficulty: 50 },
  { dungeon: "Mountain", Boss: "Merlgofreth, the Red Wyrm", Difficulty: 56 },
  { dungeon: "Void", Boss: "Zodiark, Eternal Darkness", Difficulty: 62 },
  { dungeon: "Plains", Boss: "Emiel, the Blessed", Difficulty: 42 },
];

const Reward = ["Eternal Oblivion💀", "Eternal Glory👼"];
const partyMembers = Party;
const partyMembersStats = Party.map(({ Role, ...rest }) => rest);
const membersNames = fantasyNames.map((names) => names);

//escolhe o Boss aleatoriamente
const mapDungeons = Dungeons;
const randomBossIndex = Math.floor(Math.random() * mapDungeons.length);
const setBoss = mapDungeons[randomBossIndex].Boss;

//Randomiza os stats
function getRandomStatsSum({ Role, ...stats }, combineStats) {
  const statKeys = Object.keys(stats);
  const [stat1, stat2] = statKeys.sort(() => Math.random() - 0.5).slice(0, 2);
  return combineStats(stats[stat1], stats[stat2]);
}

class Character {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this._reward = Reward[0];
  }

  assignReward(partyPower, bossDifficulty) {
    this._reward = partyPower >= bossDifficulty ? Reward[1] : Reward[0];
  }

  get reward() {
    return this._reward;
  }
}

class CharacterCreator extends Character {
  constructor(name, role, stats) {
    super(name, role);
    this.stats = stats;
  }
}

function getRandomElement(
  arr,
  chooser = () => Math.floor(Math.random() * arr.length)
) {
  return arr[chooser()];
}
const dungeon = getRandomElement(Dungeons);

const boss = dungeon.Boss;
const dungeonName = dungeon.dungeon;
const bossDifficulty = dungeon.Difficulty;

const partyMembersRandomStats = Party.map(
  (p) => getRandomStatsSum(p, (a, b) => a + b) //callback para status randomicos
);

const partyPowerLevel = partyMembersRandomStats.reduce((a, b) => a + b, 0);

function determineOutcome(partyPower, bossDifficulty, callback) {
  return callback(partyPower, bossDifficulty);
}

const finalResult = determineOutcome(
  partyPowerLevel,
  bossDifficulty,
  (power, difficulty) => (power >= difficulty ? "won" : "lost")
);

function createCharacter(
  index,
  nameList,
  partyList,
  statsList,
  rewardCallback
) {
  const nameIndex = Math.floor(Math.random() * nameList.length);
  const name = nameList.splice(nameIndex, 1)[0];
  const role = partyList[index].Role;
  const stats = statsList[index];

  const character = new CharacterCreator(name, role, stats);
  rewardCallback(character);
  return character;
}

const characters = Party.map((_, i) =>
  createCharacter(i, fantasyNames, Party, partyMembersRandomStats, (char) => {
    char.assignReward(partyPowerLevel, bossDifficulty);
  })
);

characters.forEach((char) => {
  console.log(`I am the ${char.role} my name is ${char.name}.
  After fighting the Boss ${boss} in the ${dungeon.dungeon} we ${finalResult}!
  My stats contribution to this fight was ${char.stats} and my reward is ${char.reward}.`);
});

console.log(`
    The party fought a formidable foe, ${boss}, in the dungeon ${dungeonName}.
    Eventually, they ${finalResult}, and were sent to ${
  Reward[finalResult === "won" ? 1 : 0]
}!
    The party total power was ${partyPowerLevel} and the boss Difficulty was ${bossDifficulty}.
    - Live (or die) to fight another day.
    `);
