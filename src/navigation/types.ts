/**
 * @fileoverview Navigation param list types for the entire app.
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type CharactersStackParamList = {
  CharactersList: undefined;
  CharacterDetail: {
    characterId: number;
    imageUri: string;
    characterName: string;
  };
};

export type RootTabParamList = {
  Characters: NavigatorScreenParams<CharactersStackParamList>;
  Episodes: undefined;
  Locations: undefined;
  Favourites: undefined;
};

export type CharactersListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CharactersStackParamList, 'CharactersList'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CharacterDetailScreenProps = NativeStackScreenProps<
  CharactersStackParamList,
  'CharacterDetail'
>;
