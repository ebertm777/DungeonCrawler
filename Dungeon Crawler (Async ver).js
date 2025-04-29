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

const Reward = ["Eternal Oblivion 💀", "Eternal Glory 👼"];

// Delay utilitário
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Classes
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

// Função assíncrona de narração com delay
async function narrateDungeonResult(
  characters,
  boss,
  dungeonName,
  finalResult
) {
  for (const char of characters) {
    console.log(`I am the ${char.role}, my name is ${char.name}.
  After fighting the Boss ${boss} in the ${dungeonName}, we ${finalResult}!
  My stats contribution to this fight was ${char.stats} and my reward is ${char.reward}.`);
    await delay(1000);
  }
}

// Código principal
async function main() {
  const getRandomStatsSum = ({ Role, ...stats }) => {
    const statKeys = Object.keys(stats);
    const [stat1, stat2] = statKeys.sort(() => Math.random() - 0.5).slice(0, 2);
    return stats[stat1] + stats[stat2];
  };

  const dungeon = Dungeons[Math.floor(Math.random() * Dungeons.length)];
  const boss = dungeon.Boss;
  const dungeonName = dungeon.dungeon;
  const bossDifficulty = dungeon.Difficulty;

  const partyMembersRandomStats = Party.map(getRandomStatsSum);
  const partyPowerLevel = partyMembersRandomStats.reduce((a, b) => a + b, 0);
  const finalResult = partyPowerLevel >= bossDifficulty ? "won" : "lost";

  const namesPool = [...fantasyNames];
  const characters = Party.map((member, i) => {
    const randomIndex = Math.floor(Math.random() * namesPool.length);
    const name = namesPool.splice(randomIndex, 1)[0];
    const character = new CharacterCreator(
      name,
      member.Role,
      partyMembersRandomStats[i]
    );
    character.assignReward(partyPowerLevel, bossDifficulty);
    return character;
  });

  await narrateDungeonResult(characters, boss, dungeonName, finalResult);

  console.log(`
  The party fought a formidable foe, ${boss}, in the dungeon ${dungeonName}.
  Eventually, they ${finalResult}, and were sent to ${
    Reward[finalResult === "won" ? 1 : 0]
  }!
  The party total power was ${partyPowerLevel} and the boss Difficulty was ${bossDifficulty}.
  - Live (or die) to fight another day.
  `);
}

main();
