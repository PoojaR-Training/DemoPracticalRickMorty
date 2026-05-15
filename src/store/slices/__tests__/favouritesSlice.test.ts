/**
 * @fileoverview Tests for favourites Redux slice.
 */

import reducer, {
  addFavourite,
  removeFavourite,
  clearFavourites,
} from '../favouritesSlice';
import { Character } from '../../../types/api.types';
import { FavouritesState } from '../../../types/store.types';

const makeCharacter = (overrides: Partial<Character> = {}): Character => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://example.com/rick.png',
  episode: [],
  url: '',
  created: '',
  ...overrides,
});

const RICK = makeCharacter({ id: 1, name: 'Rick Sanchez' });
const MORTY = makeCharacter({ id: 2, name: 'Morty Smith' });
const BETH = makeCharacter({ id: 3, name: 'Beth Smith' });

const emptyState: FavouritesState = { ids: [], characters: {} };

const stateWith = (...chars: Character[]): FavouritesState =>
  chars.reduce<FavouritesState>(
    (acc, c) => ({
      ids: [...acc.ids, c.id],
      characters: { ...acc.characters, [c.id]: c },
    }),
    emptyState,
  );

describe('favouritesSlice – initial state', () => {
  it('returns the correct initial state when called with undefined', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({ ids: [], characters: {} });
  });
});

describe('addFavourite', () => {
  it('adds a character id to the ids array', () => {
    const state = reducer(emptyState, addFavourite(RICK));

    expect(state.ids).toContain(RICK.id);
  });

  it('stores the full character object under its id key', () => {
    const state = reducer(emptyState, addFavourite(RICK));

    expect(state.characters[RICK.id]).toEqual(RICK);
  });

  it('appends ids in insertion order', () => {
    let state = reducer(emptyState, addFavourite(RICK));
    state = reducer(state, addFavourite(MORTY));
    state = reducer(state, addFavourite(BETH));

    expect(state.ids).toEqual([RICK.id, MORTY.id, BETH.id]);
  });

  it('is idempotent – does not duplicate an already-favourite character', () => {
    let state = reducer(emptyState, addFavourite(RICK));
    state = reducer(state, addFavourite(RICK));

    expect(state.ids).toHaveLength(1);
    expect(state.ids.filter(id => id === RICK.id)).toHaveLength(1);
  });

  it('does not mutate the previous state (immutability)', () => {
    const before = emptyState;
    reducer(before, addFavourite(RICK));

    expect(before.ids).toHaveLength(0);
    expect(before.characters).toEqual({});
  });

  it('keeps existing favourites when a new one is added', () => {
    let state = reducer(emptyState, addFavourite(RICK));
    state = reducer(state, addFavourite(MORTY));

    expect(state.characters[RICK.id]).toEqual(RICK);
    expect(state.characters[MORTY.id]).toEqual(MORTY);
  });
});

describe('removeFavourite', () => {
  it('removes the id from the ids array', () => {
    const state = reducer(stateWith(RICK, MORTY), removeFavourite(RICK.id));

    expect(state.ids).not.toContain(RICK.id);
  });

  it('deletes the character object from the map', () => {
    const state = reducer(stateWith(RICK, MORTY), removeFavourite(RICK.id));

    expect(state.characters[RICK.id]).toBeUndefined();
  });

  it('leaves other characters untouched', () => {
    const state = reducer(
      stateWith(RICK, MORTY, BETH),
      removeFavourite(RICK.id),
    );

    expect(state.ids).toEqual([MORTY.id, BETH.id]);
    expect(state.characters[MORTY.id]).toEqual(MORTY);
    expect(state.characters[BETH.id]).toEqual(BETH);
  });

  it('is a no-op when the id does not exist in favourites', () => {
    const before = stateWith(MORTY);
    const state = reducer(before, removeFavourite(999));

    expect(state.ids).toEqual([MORTY.id]);
    expect(Object.keys(state.characters)).toHaveLength(1);
  });

  it('results in empty state when the only favourite is removed', () => {
    const state = reducer(stateWith(RICK), removeFavourite(RICK.id));

    expect(state.ids).toHaveLength(0);
    expect(state.characters).toEqual({});
  });

  it('does not mutate the previous state (immutability)', () => {
    const before = stateWith(RICK, MORTY);
    reducer(before, removeFavourite(RICK.id));

    expect(before.ids).toEqual([RICK.id, MORTY.id]);
  });
});

describe('clearFavourites', () => {
  it('resets ids to an empty array', () => {
    const state = reducer(stateWith(RICK, MORTY, BETH), clearFavourites());

    expect(state.ids).toEqual([]);
  });

  it('resets the characters map to an empty object', () => {
    const state = reducer(stateWith(RICK, MORTY, BETH), clearFavourites());

    expect(state.characters).toEqual({});
  });

  it('is a no-op on already-empty state (no errors thrown)', () => {
    expect(() => reducer(emptyState, clearFavourites())).not.toThrow();

    const state = reducer(emptyState, clearFavourites());
    expect(state).toEqual(emptyState);
  });

  it('does not mutate the previous state (immutability)', () => {
    const before = stateWith(RICK, MORTY);
    reducer(before, clearFavourites());

    expect(before.ids).toEqual([RICK.id, MORTY.id]);
  });
});

describe('action creators', () => {
  it('addFavourite creates correct action shape', () => {
    expect(addFavourite(RICK)).toEqual({
      type: 'favourites/addFavourite',
      payload: RICK,
    });
  });

  it('removeFavourite creates correct action shape', () => {
    expect(removeFavourite(RICK.id)).toEqual({
      type: 'favourites/removeFavourite',
      payload: RICK.id,
    });
  });

  it('clearFavourites creates correct action shape', () => {
    expect(clearFavourites()).toEqual({
      type: 'favourites/clearFavourites',
    });
  });
});

describe('favouritesSlice – multi-action workflows', () => {
  it('add → remove → add produces correct final state', () => {
    let state = reducer(emptyState, addFavourite(RICK));
    state = reducer(state, removeFavourite(RICK.id));
    state = reducer(state, addFavourite(RICK));

    expect(state.ids).toEqual([RICK.id]);
    expect(state.characters[RICK.id]).toEqual(RICK);
  });

  it('add multiple → clear → add one works correctly', () => {
    let state = reducer(emptyState, addFavourite(RICK));
    state = reducer(state, addFavourite(MORTY));
    state = reducer(state, addFavourite(BETH));
    state = reducer(state, clearFavourites());
    state = reducer(state, addFavourite(MORTY));

    expect(state.ids).toEqual([MORTY.id]);
    expect(Object.keys(state.characters)).toHaveLength(1);
    expect(state.characters[MORTY.id]).toEqual(MORTY);
  });
});
