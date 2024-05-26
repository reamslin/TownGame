let currentRound;
const buttonElement = document.querySelector(".nextround");
buttonElement.addEventListener("click", () => {
  currentRound.nextRound();
});

export default class Round {
  static yearElement = document.querySelector(".year");
  static objectsElement = document.querySelector(".roundobjects");
  static storyElement = document.querySelector("p");
  static roundElement = document.querySelector(".round");
  static roundObjectButtons = document.querySelectorAll(".object");

  constructor(
    roundName,
    roundYear,
    roundObjects,
    roundStory,
    nextRoundFunction
  ) {
    this.roundName = roundName;
    this.roundYear = roundYear;
    this.roundObjects = roundObjects;
    this.nextRoundFunction = nextRoundFunction;
    this.roundStory = roundStory;
    this.setHtml();
  }

  setHtml() {
    Round.yearElement.innerText = this.roundYear;
    Round.storyElement.innerText = this.roundStory;
    Round.roundElement.innerText = this.roundName;
    Round.objectsElement.innerHTML = this.roundObjectsHtml();

    Round.roundObjectButtons.forEach((b) => {
      console.log(b);
      if (!(b.firstElementChild.id in this.roundObjects)) {
        b.style.display = "none"; // Hide the button
      } else {
        b.style.display = "flex"; // Show the button
      }
    });
  }

  nextRound() {
    currentRound = this.nextRoundFunction();
  }

  roundObjectsHtml() {
    let html = "";
    for (const [object, quantity] of Object.entries(this.roundObjects)) {
      if (object === "tracks") {
        html += `<li>${object}</li>`;
      } else {
        const objectString = this.pluralize(object, quantity);
        html += `<li>${quantity} ${objectString}</li>`;
      }
    }
    return html;
  }

  pluralize(object, quantity) {
    const pluralForms = {
      factory: "factories",
      church: "churches",
      tenement: "tenements",
      pub: "pubs",
      mansion: "mansions",
      store: "stores",
      hospital: "hospitals",
      mine: "mines",
      cemetery: "cemeteries",
      jail: "jails",
      museum: "museums",
      theater: "theaters",
      railroad: "railroads",
      "iron bridge": "iron bridges",
      canal: "canals",
      road: "roads",
      tree: "trees",
    };
    if (quantity === 1) {
      return object;
    } else if (object in pluralForms) {
      return pluralForms[object];
    } else {
      return object + "s";
    }
  }
}
const round0 = () =>
  new Round(
    "Introduction",
    1820,
    {
      house: 10,
      church: 1,
      cemetery: 1,
      store: 1,
      pub: 1,
      mine: 1,
    },
    `
The year is 1820, and Lowell, Massachusetts, is a burgeoning mill town in the United States. Draw a river flowing from east to west, a wooden bridge crossing it, two roads intersecting at the bridge, and add 10 houses, 1 church, 1 cemetery, 1 store, 1 pub, 1 textile mill, and at least 50 trees.
Lowell thrived as an industrial hub due to its strategic location along the Merrimack River, offering abundant waterpower for mills and facilitating trade. Its proximity to Boston ensured access to markets and capital, while a growing population provided a steady labor force, including many immigrants. Early adoption of the factory system and technological innovations further propelled Lowell's success as a leading industrial center in the 19th century.
During the Industrial Era, Lowell transformed from a rural village into a bustling industrial center. Textile mills flourished, attracting a diverse workforce, including women and immigrants, to labor in the factories. The city's population boomed, infrastructure expanded, and innovations in manufacturing techniques revolutionized production.
However, rapid industrialization also brought challenges, including poor working conditions, labor unrest, and environmental pollution. Despite these issues, Lowell emerged as a significant industrial powerhouse, shaping the economic and social landscape of the region.
Over the next 100 years, a revolution as significant as the Neolithic Revolution will completely change life in Lowell. We will experience some of these changes in the next few hours.
`,
    round1
  );

const round1 = () =>
  new Round(
    "Round 1",
    1825,
    {
      mansion: 1,
    },
    `
  It is now 1825. Lowell's geography is unique with the Merrimack River running through, perfect for providing power and transportation. You, an enterprising capitalist, decide to invest in the construction of a canal. Your canal brings remarkable profits, reducing transportation costs significantly. Build yourself nice home anywhere along the canal.
`,
    round2
  );

const round2 = () =>
  new Round(
    "Round 2",
    1830,
    {
      house: 5,
    },
    `
It is now 1830. Lowell experiences a population explosion due to improved hygiene and diet. Add 5 houses.
`,
    round3
  );

const round3 = () =>
  new Round(
    "Round 3",
    1840,
    {
      house: 5,
    },
    `
  It is 1840. Mechanical farming inventions agricultural productivity, and Lowell’s population thrives. Add 5 houses. Round 4 It is now 1855. The first textile factory is built in Lowell, powered by water from the Merrimack River. Add 1 factory and 5 houses for the workers.
  `,
    round4
  );

const round4 = () =>
  new Round(
    "Round 4",
    1855,
    {
      factory: 1,
      house: 5,
    },
    `
It is now 1855. The first textile factory is built in Lowell, powered by water from the Merrimack River. Add 1 factory and 5 houses for the workers.
  `,
    round5
  );

const round5 = () =>
  new Round(
    "Round 5",
    1856,
    {
      house: 15,
      church: 1,
      store: 1,
      pub: 1,
    },
    `
  It is now 1856. The textile factory attracts workers, including women and families. Add 15 houses, a church, a pub, and a store.
  `,
    round6
  );

const round6 = () =>
  new Round(
    "Round 6",
    1860,
    {
      house: 5,
      factory: 5,
    },
    `It is 1860. The success of the textile industry leads to the establishment of new factories along the riverbank. Add 5 factories and 5 houses.
  `,
    round7
  );

const round7 = () =>
  new Round(
    "Round 7",
    1865,
    {
      tenement: 5,
    },
    `It is now 1865. Unemployed workers flock to Lowell for jobs. Housing demand rises, leading to the construction of tenements. Add 5 tenements.
  `,
    round8
  );

const round8 = () =>
  new Round(
    "Round 8",
    1866,
    {
      church: 1,
      store: 1,
      pub: 1,
      school: 1,
    },
    `
It is now 1866. With more workers, services like stores, pubs, churches, and schools grow. Add 1 store, 1 pub, 1 church, and 1 school.
`,
    round9
  );

const round9 = () =>
  new Round(
    "Round 9",
    1867,
    {
      tenement: 4,
      pub: 5,
    },
    `It is now 1867. Long factory hours and stress drive workers to pubs, increasing alcohol consumption. Add 5 pubs and 4 tenements.
  `,
    round10
  );

const round10 = () =>
  new Round(
    "Round 10",
    1868,
    {
      mansion: 2,
      factory: 1,
      house: 10,
    },
    `It is now 1868. Despite hardships, some wealthy landowners and factory owners prosper. Add 2 nice homes and 1 factory, along with 10 houses for the workforce.
  `,
    round11
  );

const round11 = () =>
  new Round(
    "Round 11",
    1870,
    {
      factory: 10,
      mansion: 1,
    },
    `The year is 1870. Steam engines replace water frames, boosting efficiency and mobility. Factories can now be built away from the river. Add 10 factories and one nice house.
  `,
    round12
  );

const round12 = () =>
  new Round(
    "Round 12",
    1880,
    {
      "iron bridge": 1,
      mine: 1,
      house: 5,
    },
    `The year is 1880. The puddling process enables the use of coal in iron production, ushering in a new era of heavy industry. Add 1 coal mine and a new iron bridge. Add 5 houses.
  `,
    round13
  );

const round13 = () =>
  new Round(
    "Round 13",
    1890,
    {
      mine: 1,
      cemetery: 1,
    },
    `
  The year is 1890. Coal mining intensifies, with children as young as 8 working long hours in dangerous conditions. Add another coal mine and a cemetery.
  `,
    round14
  );

const round14 = () =>
  new Round(
    "Round 14",
    1900,
    {
      tracks: true,
      house: 5,
    },
    `
  It is now 1900. Railroads become vital for transportation. Add a major railroad line connecting factories and mines. Add 5 houses for railroad workers.
  `,
    round15
  );

const round15 = () =>
  new Round(
    "Round 15",
    1905,
    {
      jail: 1,
      pub: 2,
      tenement: 2,
    },
    `
  It is now 1905. The influx of workers leads to the hiring of women and children at lower wages. Depressed, ashamed, and angry about their wives, and children toiling in factories, many men turn to crime, and the social life of the pub. Add 1 jail, 2 pubs, and 2 tenements.
  `,
    round16
  );

const round16 = () =>
  new Round(
    "Round 16",
    1915,
    {
      hospital: 2,
      cemetery: 1,
    },
    `In 1915, the working conditions in Lowell's factories are dire. Many suffer from factory fever or white lung disease due to hazardous environments. Lack of safety measures leads to accidents, with workers, including children, sustaining injuries. Add 2 hospitals and 1 cemetery.
  `,
    round17
  );

const round17 = () =>
  new Round(
    "Round 17",
    1917,
    {
      house: 5,
      tenement: 1,
      tracks: true,
    },
    `
    By 1917, the need for efficient transportation grows. The influx of Irish labor aids in building more railroads. Add 1 new railroad line stretching from East to West, 5 houses, and 1 tenement for railroad workers.
  `,
    round18
  );

const round18 = () =>
  new Round(
    "Round 18",
    1919,
    {
      theater: 1,
      museum: 1,
      school: 2,
      mansion: 1,
    },
    `
  In 1919, urban life in Lowell offers cultural amenities for the middle class. Museums, theaters, and schools become accessible, enriching the community. Add 1 theater, 1 museum, 2 schools, and 1 nice house.
  `,
    round19
  );

const round19 = () =>
  new Round(
    "Round 19",
    1920,
    {
      cemetery: 1,
      jail: 1,
      hospital: 1,
    },
    `By 1920, industrial pollution plagues Lowell. Air and water quality decline, leading to health issues like cancer and reduced life expectancy. The city is overcrowded and shrouded in factory smoke. The noises, the loss of privacy, & the loss of the family unit shatters the peace of the old ways. Add 1 cemetery, 1 jail, and 1 hospital to address the urban challenges.
  `,
    round20
  );

const round20 = () =>
  new Round(
    "Round 20",
    1925,
    {
      house: 20,
      tenement: 5,
      store: 2,
      church: 1,
      factory: 5,
      pub: 1,
      mansion: 3,
    },
    `In 1925, the lasting impact of industrialization on Lowell is profound, shaping its identity as a historic center of innovation and industry. While it brought economic prosperity and urban development, it also left a legacy of social change, environmental challenges, and the ongoing evolution of its community fabric. Add 20 houses, 5 tenements, 2 stores, 1 church, 5 factories, 1 pub, and 3 nice houses, reflecting Lowell's
  `,
    null
  );
currentRound = round0();
