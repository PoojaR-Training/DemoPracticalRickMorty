/**
 * @fileoverview API response type definitions for the Rick and Morty API.
 */


export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginatedResponse<T> {
  info: ApiInfo;
  results: T[];
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: CharacterStatus | '';
  gender?: CharacterGender | '';
  species?: string;
}

export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}

export interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export interface SeasonGroup {
  season: number;
  episodes: Episode[];
}

export const STATUS_OPTIONS: Array<{
  label: string;
  value: CharacterStatus | '';
  icon: string;
}> = [
  { label: 'All', value: '', icon: 'view-grid-outline' },
  { label: 'Alive', value: 'Alive', icon: 'heart-pulse' },
  { label: 'Dead', value: 'Dead', icon: 'skull-outline' },
  { label: 'Unknown', value: 'unknown', icon: 'help-circle-outline' },
];

export const GENDER_OPTIONS: Array<{
  label: string;
  value: CharacterGender | '';
  icon: string;
}> = [
  { label: 'All', value: '', icon: 'account-group-outline' },
  { label: 'Male', value: 'Male', icon: 'gender-male' },
  { label: 'Female', value: 'Female', icon: 'gender-female' },
  { label: 'Genderless', value: 'Genderless', icon: 'gender-non-binary' },
];