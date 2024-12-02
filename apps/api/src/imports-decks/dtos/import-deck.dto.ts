import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class ImportDeckDto {

    @ApiProperty({
        description: "unique identifier of the import deck",
        example: '245'
    })
    id: string;

    @ApiProperty({
        description: 'name/title of the deck',
        example: 'Deck importado',
    })
    name: string;

    @ApiProperty({
        description: 'description of the deck',
        example: 'esse deck foi importado',
    })
    description: string;

    @ApiProperty({
        description: 'the name of the commander card',
        example: 'Dina, Soul Steeper',
    })
    commanderName: string;

    @ApiProperty({
        description: 'an array of card names',
        example:
            [
                "Abomination of Gudul",
                "Abomination of Llanowar",
                "Abrupt Decay",
                "Abzan Ascendancy",
                "Abzan Charm",
                "Abzan Guide",
                "Acolyte of Affliction",
                "Adun Oakenshield",
                "Agent Frank Horrigan",
                "A-Harald, King of Skemfar",
                "A-Harald Unites the Elves",
                "Akawalli, the Seething Tower",
                "Alpha Deathclaw",
                "A-Masked Bandits",
                "A-Moss-Pit Skeleton",
                "A-Mr. Orfeo, the Boulder",
                "Amzu, Swarm's Hunger",
                "Anafenza, the Foremost",
                "Ancient Lumberknot",
                "Anikthea, Hand of Erebos",
                "Archelos, Lagoon Mystic",
                "Armament Corps",
                "A-Shessra, Death's Whisper",
                "A-Soul of Windgrace",
                "Assassin's Trophy",
                "Assemble the Team",
                "Atogatog",
                "Atomize",
                "Atraxa, Grand Unifier",
                "Atraxa, Praetors' Voice",
                "Attendant of Vraska",
                "A-Uurg, Spawn of Turg",
                "Baba Lysaga, Night Witch",
                "Back for More",
                "Badlands Revival",
                "Baloth Null",
                "Bartel Runeaxe",
                "Begin the Invasion",
                "Belbe, Corrupted Observer",
                "Beledros Witherbloom",
                "Bhaal, Lord of Murder",
                "Bilbo, Birthday Celebrant",
                "Binding the Old Gods",
                "Blightreaper Thallid // Blightsower Thallid",
                "Bloodbond March",
                "Blood Researcher",
                "Bloodsprout Talisman",
                "Boneyard Lurker",
                "Bortuk Bonerattle",
                "Bound // Determined",
                "Brokkos, Apex of Forever",
                "Broodmate Dragon",
                "Broodmate Tyrant",
                "Broodspinner",
                "Cadaverous Bloom",
                "Camellia, the Seedmiser",
                "Canker Abomination",
                "Cankerous Thirst",
                "Carrion Thrash",
                "Carth the Lion",
                "Casualties of War",
                "Cease // Desist",
                "Charnelhoard Wurm",
                "Charnel Troll",
                "Chevill, Bane of Monsters",
                "Child of Alara",
                "Chromanticore",
                "Cleopatra, Exiled Pharaoh",
                "Coalition Victory",
                "Colfenor, the Last Yew",
                "Compy Swarm",
                "Conflux",
                "Consume Strength",
                "Convert to Slime",
                "Coram, the Undertaker",
                "Corpseberry Cultivator",
                "Corpsejack Menace",
                "Cram Session",
                "Creakwood Liege",
                "Crew Captain",
                "Crime // Punishment",
                "Cromat",
                "Culling Ritual",
                "Cursed Wombat",
                "Daemogoth Titan",
                "Daemogoth Woe-Eater",
                "Damia, Sage of Stone",
                "Darigaaz Reincarnated",
                "Darigaaz's Charm",
                "Darigaaz, Shivan Champion",
                "Darigaaz, the Igniter",
                "Dark Heart of the Wood",
                "Darkheart Sliver",
                "Darksteel Hydra",
                "Deadbridge Chant",
                "Deadly Brew",
                "Deathbloom Ritualist",
                "Death Frenzy",
                "Deathless Knight"
            ]
    })
    cardsNames: string[];

    ownerId: mongoose.Types.ObjectId;
}