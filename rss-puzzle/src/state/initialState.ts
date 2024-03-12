import { State, WordType } from 'types/interfaces';

type PageType = 'login' | 'start' | 'main';

type GameStatusType = {
  count: number;
  limit: number;
};

type StateApp = {
  user: State | null;
  updateState(user: State | null, page?: PageType): void;
  updateRounds(data: RoundsData): void;
  currentPage: PageType;
  roundsData: RoundsData | null;
  gameStatus: GameStatusType;
  changeGameStatus(data: GameStatusType): void;
};

type LevelDataType = {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
};

type Round = {
  levelData: LevelDataType;
  words: WordType[];
};

type RoundsData = {
  roundsCount: number;
  rounds: Round[];
};

const initialState: StateApp = {
  user: {
    name: '',
    surname: '',
  },
  gameStatus: {
    count: 0,
    limit: 0,
  },
  currentPage: 'login',
  roundsData: null,

  updateState(user, page?: PageType): void {
    this.user = user;
    if (page) {
      this.currentPage = page;
    }
  },
  updateRounds(data: RoundsData): void {
    this.roundsData = data;
  },
  changeGameStatus(data: GameStatusType): void {
    this.gameStatus = data;
  },
};

async function getRounds(): Promise<void> {
  await fetch(
    'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json'
  )
    .then((response) => response.json())
    .then((data: RoundsData) => {
      initialState.updateRounds(data);
    })
    .catch((err) => new Error(err));
}

export { initialState, getRounds };
