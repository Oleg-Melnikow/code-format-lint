import { findElement } from 'helpers/findElement';
import { saveControlsButton } from 'helpers/saveUserData';
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
  currentRound: Round | null;
  currentSentence: WordType | null;
  gameStatus: GameStatusType;
  hintVisible: boolean;
  soundVisible: boolean;
  currentUrlAudio: string;
  chnageHindVisible(): void;
  chnageSoundVisible(): void;
  changeGameStatus(data: GameStatusType): void;
  updateCurrentSentence(): void;
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
  currentRound: null,
  currentSentence: null,
  hintVisible: true,
  soundVisible: true,
  currentUrlAudio: '',

  updateState(user, page?: PageType): void {
    this.user = user;
    if (page) {
      this.currentPage = page;
    }
  },
  updateRounds(data: RoundsData): void {
    this.roundsData = data;
    const [round] = data.rounds;
    const [sentence] = round.words;
    this.currentRound = round;
    this.currentSentence = sentence;
    console.log(round, sentence, 'item');
  },
  changeGameStatus(data: GameStatusType): void {
    this.gameStatus = data;
  },
  updateCurrentSentence(): void {
    if (this.currentSentence && this.currentRound) {
      const { id } = this.currentSentence;
      const { words } = this.currentRound;
      const positionWods = words.findIndex((x) => x.id === id);
      const [current] = words.slice(positionWods + 1);
      this.currentSentence = current;
      console.log(this.currentSentence.textExample);
    }
  },

  chnageHindVisible(): void {
    this.hintVisible = !this.hintVisible;
    saveControlsButton();
  },

  chnageSoundVisible(): void {
    this.soundVisible = !this.soundVisible;
    saveControlsButton();
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

async function getSound(audioExample: string): Promise<void> {
  console.log(audioExample);
  const url = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioExample}`;
  await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const urlFile = URL.createObjectURL(blob);
      initialState.currentUrlAudio = urlFile;
      const source = findElement('.source');
      if (!(source instanceof HTMLSourceElement)) {
        throw new Error('ss');
      }
      source.src = urlFile;
    })
    .catch((err) => new Error(err));
}

export { initialState, getRounds, getSound };
