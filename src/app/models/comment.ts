import { Player } from './player';
import { Vote } from './vote';

export class Comment {
  id: string;
  text: string;
  player: Player;
  date: Date;
  buildId: string;
  votes: Vote[];
}
