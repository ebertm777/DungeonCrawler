/*TODO
 ** Final
 */

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
  { dungeon: "Cave", Boss: "Titan, Lord of Crags", Difficulty: 41 },
  { dungeon: "Temple", Boss: "Iona, Shield of Emeria", Difficulty: 60 },
  { dungeon: "Swamp", Boss: "Cúchulainn, the Impure", Difficulty: 52 },
  { dungeon: "Island", Boss: "Leviathan, Lord of the Whorl", Difficulty: 58 },
  { dungeon: "Forest", Boss: "Kogla, the Titan Ape", Difficulty: 50 },
  { dungeon: "Mountain", Boss: "Merlgofreth, the Red Wyrm", Difficulty: 56 },
  { dungeon: "Void", Boss: "Zodiark, Eternal Darkness", Difficulty: 62 },
  { dungeon: "Plains", Boss: "Emiel, the Blessed", Difficulty: 46 },
];

const Reward = ["Eternal Oblivion", "Eternal Glory"];
const partyMembers = Party.map((party) => party);
const partyMembersStats = Party.map(({ Role, ...rest }) => rest);
const membersNames = fantasyNames.map((names) => names);

//escolhe o Boss aleatoriamente
const mapDungeons = Dungeons.map((dungeons) => dungeons);
const randomBossIndex = Math.floor(Math.random() * mapDungeons.length);
const setBoss = mapDungeons[randomBossIndex].Boss;

//Randomiza os stats
const getRandomStatsSum = ({ Role, ...stats }) => {
  const statKeys = Object.keys(stats);
  const [stat1, stat2] = statKeys.sort(() => Math.random() - 0.5).slice(0, 2); // seleciona 2 stats aleatoriamente
  return stats[stat1] + stats[stat2];
};
const partyMembersRandomStats = Party.map(getRandomStatsSum);

//soma os stats da party
const partyPowerLevel = partyMembersRandomStats.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

const finalResult =
  partyPowerLevel < mapDungeons[randomBossIndex].Difficulty ? "lose" : "won";

class Character {
  constructor(name, role) {
    this.role = role;
    this.name = name;
    this._reward = Reward[0];
  }

  get reward() {
    return this._reward;
  }

  set reward(rewardCheck) {
    if (mapDungeons[randomBossIndex].Difficulty > partyPowerLevel) {
      this._reward = Reward[0];
    } else {
      this._reward = Reward[1];
    }
  }
}

class characterCreator extends Character {
  constructor(name, role, stats) {
    super(name, role);
    this.stats = stats;
  }
}

for (let Members = 0; Members < partyMembers.length; Members++) {
  const randomIndex = Math.floor(Math.random() * membersNames.length);
  const uniqueName = membersNames.splice(randomIndex, 1)[0]; //evita nomes duplicados
  const newCharacter = new characterCreator(
    uniqueName,
    partyMembers[Members].Role,
    partyMembersRandomStats[Members]
  );
  newCharacter.reward = true;

  const partyAttributes = `I'am the ${newCharacter.role} my name is ${newCharacter.name}. 
  After fighting the Boss ${setBoss} in the ${mapDungeons[randomBossIndex].dungeon} we ${finalResult}!
  My stats contribution to this fight was ${newCharacter.stats} and my reward is ${newCharacter.reward}. `;
  console.log(partyAttributes);
}
